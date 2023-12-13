const BaseController = require("./baseController");
const bcrypt = require("bcrypt"); // hashing User inputs on Sign Up / Log In
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

require("dotenv").config();

class UsersController extends BaseController {
  constructor(
    model,
    videoClipModel,
    artistModel,
    genreModel,
    instrumentModel,
    userInstrumentModel,
    chatroomModel,
    chatroomMessageModel,
    attachmentModel
  ) {
    super(model);
    this.chatroomModel = chatroomModel;
    this.chatroomMessageModel = chatroomMessageModel;
    this.videoClipModel = videoClipModel;
    this.artistModel = artistModel;
    this.genreModel = genreModel;
    this.instrumentModel = instrumentModel;
    this.userInstrumentModel = userInstrumentModel;
    this.attachmentModel = attachmentModel;
  }

  /** Basic Auth */
  async signUpUser(req, res) {
    const { fullName, password } = req.body;

    // Input Validation
    if (!fullName || !password) {
      return res
        .status(400)
        .json({ success: false, data: "Missing Basic Information" });
    }

    // Hash the Password so we don't save plaintext on client/don't send plain text over the internet
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const newUser = await this.model.create({
        fullName: fullName,
        password: hashedPassword,
        profilePictureUrl: "",
        bio: "",
        experience: "",
      });
      return res.json({ success: true, data: newUser });
    } catch (err) {
      return res.status(400).json({ success: false, data: err.message });
    }
  }

  async signInUser(req, res) {
    const { fullName, password } = req.body;

    if (!fullName || !password) {
      return res
        .status(400)
        .json({ success: false, data: "Missing Basic Information" });
    }

    const user = await this.model.findOne({ where: { fullName: fullName } });

    if (!user) {
      return res.status(404).json({ success: false, data: err.message });
    }

    const compare = await bcrypt.compare(password, user.password);

    if (!compare) {
      return res
        .status(403)
        .json({ success: false, data: "Input password does not match " });
    }

    return res.json({
      success: true,
    });
  }

  /** JWT Auth */
  async jwtSignUp(req, res) {
    const { fullName, password } = req.body;

    // Input Validation
    if (!fullName || !password) {
      return res
        .status(400)
        .json({ success: false, data: "Missing Basic Information" });
    }

    // Hash the Password so we don't save plaintext on client/don't send plain text over the internet
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
      const newUser = await this.model.create({
        fullName: fullName,
        password: hashedPassword,
        profilePictureUrl: "",
        bio: "",
        experience: "",
      });

      // For JWT auth, we return a JWT rather than a JSON (in basic signin)
      const payload = {
        id: newUser.id,
        fullName: newUser.fullName,
      };

      const token = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: "5mins",
      });
      return res.json({ success: true, data: token });
    } catch (err) {
      return res.status(400).json({ success: false, data: err.message });
    }
  }

  async jwtLogInUser(req, res) {
    const { fullName, password } = req.body;

    if (!fullName || !password) {
      return res
        .status(400)
        .json({ success: false, data: "Missing Basic Information" });
    }

    const user = await this.model.findOne({
      where: { fullName: fullName },
    });

    if (!user) {
      return res.json({ success: false, msg: "User not found." });
      // how to catch res.status(404).json ? It breaks my frontend.
    }

    const compare = await bcrypt.compare(password, user.password);

    if (!compare) {
      return res.json({
        success: false,
        data: "Input password does not match ",
      });
    }

    // For JWT auth, the Payload (the return) is different from basic sign in.

    const payload = {
      id: user.id,
      fullName: fullName,
    };

    const token = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: "60mins",
    });

    return res.json({ success: true, data: token, id:user.id});
  }

  /** Test Route - this pulls Tough Guy's data */
  async testRoute(req, res) {
    try {
      const user = await this.model.findByPk(5);
      return res.json({ success: true, user});
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  /** User Methods */
  async getCurrentUser(req, res) {
    const userId = req.userId;
    try {
      const user = await this.model.findByPk(userId);
      return res.json({ success: true, user, ownId:userId });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getFilteredUsers(req, res) {//filter by artists, instruments, genres
    const { category, option } = req.params; //option is case sensitive!
    const inputArray = [{
      model:this.instrumentModel,
    }]
    if (category !== 'instruments') {
      inputArray.push(category)
    }
    try {
      const filteredUsers = await this.model.findAll({ 
        include: inputArray,
        where: { [`$${category}.name$`]: option }, 
        order:[[{model:this.instrumentModel},{model:this.userInstrumentModel}, 'instrumentExperience', 'DESC']]
      });
      return res.json({ success: true, filteredUsers });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
  //qualifications

  //http://localhost:8080/users/search?instruments=Acoustic%20Guitar
  //http://localhost:8080/users/search?instruments=Acoustic%20Guitar&genres=Classical
  
  async getMultiFilteredUsers(req, res) {
    //pull the inputs from query params
    const selectionsArray = Object.entries(req.query)
   
    //initialising the query inputs
    const tablesToInclude = [{ // we want to include these tables
      model:this.instrumentModel,
    }]
    const tablesNotToAdd = ['qualifications', 'musicianship', 'instruments']
    const whereObject = {} //at the same time we also need to generate the where clause

    //iterating through the unpacked selections and populating the query inputs
    selectionsArray.forEach((selection)=>{ 
      const category = selection[0];
      const chosenValue = selection[1];
      if (!tablesNotToAdd.includes(category)) { // if category isn't one of the 'don't add' tables
        tablesToInclude.push(category) // note category must be exactly equal to table name)
      }   
      if (category === 'musicianship') {
        whereObject[`careerStatus`] = chosenValue;
      } else if (category === 'qualifications') {
        whereObject['$instruments.userInstrument.highest_qualification$'] = chosenValue;
        //
      } else {
        whereObject[`$${category}.name$`] = chosenValue 
      }
    })

    //actual query
    try {
      const results = await this.model.findAll({ 
        include: tablesToInclude, // include all the tables listed in criteria
        where: whereObject, //find all user entries matching selected category and option
        // order:[[{model:this.instrumentModel},{model:this.userInstrumentModel}, 'instrumentExperience', 'DESC']]
      });

      return res.json({ success: true, results, userId:req.userId });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getOneUser(req, res) {
    const { userId } = req.params;
    try {
      const user = await this.model.findByPk(userId);
      return res.json({ success: true, user });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getUsersByName(req, res) {
    const { userName } = req.params;
    console.log(userName)
    try {
      const users = await this.model.findAll({
        where: {
          fullName: {
            [Op.startsWith]:userName
          }
        },
      });
      console.log(users)
      return res.json({ success: true, users});
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async postOneUser(req, res) {
    const { fullName } = req.body;
    if (!fullName) {
      res.status(400).json({ success: false, msg: "input error" });
    }
    try {
      const newUser = await this.model.create({
        fullName,
        profilePictureUrl: "",
        bio: "",
        experience: "",
      });
      return res.json({ success: true, user: newUser });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async putOneUser(req, res) {
    const { userId } = req.params;
    const { fullName, profilePictureUrl, bio, experience, careerStatus, email  } = req.body;
    console.log(req.body)
    console.log(userId)
    try {
      const editedUser = await this.model.update(
        {
          fullName,
          profilePictureUrl,
          bio,
          experience,
          careerStatus,
          email
        },
        {
          where: { id: userId },
          returning: true,
        }
      );
      return res.json({ success: true, editedUser });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getAllJoinedChatrooms(req, res) {
    // const { userId } = req.params;

    const userId = req.userId;

    try {
      const user = await this.model.findByPk(userId);
      const allJoinedChatrooms = await user.getChatrooms();
      return res.json({ success: true, data: allJoinedChatrooms });
    } catch (err) {
      return res.status(402).json({ success: false, msg: err.message });
    }
  }

  async postMessageToChatroom(req, res) {
    const { chatroomId, content } = req.body;
    const userId = req.userId;

    if (!chatroomId || !content) {
      return res.status(400).json({ success: false, msg: "Input error!" });
    }

    try {
      const newChatroomMessage = await this.chatroomMessageModel.create({
        authorId: userId,
        chatroomId: chatroomId,
        content: content,
      });
      return res.json({ success: true, data: newChatroomMessage });
    } catch (err) {
      return res.status(400).json({ success: false, msg: err.message });
    }
  }

  async createChatroomForOneUser(req, res) {
    const { userId, name, description, genresPlayed, instrumentsWanted } =
      req.body;

    if (!userId || !name) {
      return res.json({ success: false, msg: "requires a room name" });
    }

    try {
      const createdRoom = await this.chatroomModel.create({
        name,
        description,
        genresPlayed,
        instrumentsWanted,
      });

      const addUserToNewRoom = await createdRoom.addUser(userId);

      return res.json({ success: true, data: addUserToNewRoom });
    } catch (err) {
      return res.status(400).json({ success: false, msg: err.message });
    }
  }

  async createChatroomForTwoUsers(req, res) {
    const {secondUserId, name, description, genresPlayed, instrumentsWanted } =
      req.body;
    const userId= req.userId

    // if (!userId || !name) {
    //   return res.json({ success: false, msg: "requires a room name" });
    // }

    try {
      const firstUser = await this.model.findByPk(userId)
      console.log(firstUser.fullName)
      const createdRoom = await this.chatroomModel.create({
        name,
        description,
        genresPlayed,
        instrumentsWanted,
      });

      const addUserToNewRoom = await createdRoom.addUser(userId);
      const addNextUserToNewRoom = await createdRoom.addUser(secondUserId);

      return res.json({ success: true, data: [addUserToNewRoom, addNextUserToNewRoom]});
    } catch (err) {
      return res.status(400).json({ success: false, msg: err.message });
    }
  }

//test route:
//http://localhost:8080/users/createNewChatroomForMany

//test body:
// {
//   "name": "foo",
//   "description" : "bar",
//   "genresPlayed" : "qux",
//   "instrumentsWanted" : "quz",
//   "memberIds" : {
//     "1":"1",
//     "2":"2",
//     "3":"3"
//   }
// }
  async createChatroomForManyUsers(req, res) {
    const {memberIds, name, description, genresPlayed, instrumentsWanted } =req.body;
    //memberIds is an object with format {1:userId1, 2:userId2, 3:userId3, ....}
    //name can be anything but let's set it to be equal to the groupName
    //the rest can just be inserted as "" - refer to StartChatButton.js

    try {
      const createdRoom = await this.chatroomModel.create({
        name,
        description,
        genresPlayed,
        instrumentsWanted,
      });
      console.log('we got here')
      const memberIdArray = Object.values(memberIds)
      console.log(memberIdArray)
      const addAllUsersToNewRoom = await createdRoom.addUsers(memberIdArray)
      
      return res.json({ success: true, data: addAllUsersToNewRoom});
    } catch (err) {
      return res.status(400).json({ success: false, msg: err.message });
    }
  }

  async postMessageAttachment(req, res) {
    const { mediaURL, messageId, chatroomId, fileType } = req.body;

    if (!mediaURL || !messageId || !chatroomId || !`${fileType}`) {
      return res.status(400).json({ success: false, msg: "Input error!" });
    }

    try {
      const newAttachment = await this.attachmentModel.create({
        attachmentUrl: mediaURL,
        messageId: messageId,
        chatroomId: chatroomId,
        fileType: `${fileType}`,
        index: 1, // placeholder
      });
      return res.json({ success: true, data: newAttachment });
    } catch (err) {
      return res.status(400).json({ success: false, msg: err.message });
    }
  }

  async addProfilePicture(req, res) {
    const { photoURL } = req.body;
    let userId = req.userId; // from Middleware
    try {
      const addToUser = await this.model.findByPk(userId);
      const addProfilePic = await addToUser.update({
        profilePictureUrl: photoURL,
      });

      return res.json({ success: true, data: addProfilePic });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getAllClips(req, res) {
    const { userId } = req.params;
    try {
      const output = await this.videoClipModel.findAll({
        where: { userId },
        order: [["createdAt", "DESC"]],
        attributes:["id", "createdAt", "updatedAt", "hostUrl", "userId", "groupId"]
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async postClip(req, res) {
    const userId  = req.userId;
    const { hostUrl } = req.body;
    console.log('running')
    try {
      const newClip = await this.videoClipModel.create(
        { 
        userId,
        groupId:null,
        hostUrl:hostUrl   
      }
      );
      return res.json({ success: true, newClip });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async putClip(req, res) {
    const { userId, clipId } = req.params;
    const { hostUrl } = req.body;
    try {
      const editedClip = await this.videoClipModel.update(
        { hostUrl },
        {
          where: {
            id: clipId,
            userId,
          },
          returning: true,
        }
      );
      return res.json({ success: true, editedClip });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async deleteClip(req, res) {
    const { clipId } = req.params;
    const userId  = req.userId;
    console.log('something')
    try {
      await this.videoClipModel.destroy({
        where: {
          userId,
          id: clipId,
        },
      });
      return res.json({ success: true });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getArtists(req, res) {
    const { userId } = req.params;
    try {
      const artistInterests = await this.artistModel.findAll({
        where: { "$users.id$": userId },
        include: { model: this.model, attributes: [] },
        attributes: ["name"],
      });
      return res.json({ success: true, artistInterests });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async addArtistInterest(req, res) {
    const { userId } = req.params;
    const { artistId } = req.body;
    console.log("accessed method");
    try {
      const addingUser = await this.model.findByPk(userId); // is there a way to eager loading this?
      const newArtistInterest = await addingUser.addArtist(artistId);
      console.log("added");
      return res.json({ success: true, newArtistInterest });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async removeArtistInterest(req, res) {
    const { userId, artistId } = req.params;
    try {
      const removingUser = await this.model.findByPk(userId); // is there a way to eager loading this? Not unless we want to call the joint model
      await removingUser.removeArtist(artistId);
      return res.json({ success: true });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getInstruments(req, res) {
    const { userId } = req.params;
    try {
      const playedInstrumentData = await this.model.findAll({
        include: [
          {
            model: this.instrumentModel, //include instruments - this also pulls userInstrument data by default
            attributes: ["id", "name"], //we only want name from instrument model
            through: {
              model: this.userInstrumentModel,
              attributes: ["highestQualification", "qualificationInstitution"], //specify we only want instrumentExperience from userInstrument models
            },
          },
        ],
        order: [
          [
            this.instrumentModel,
            this.userInstrumentModel,
            "id",
            "DESC",
          ],
        ], // sort instruments in descending order by instrumentExp col of userInstrument model nested in Instrument model
        where: { id: userId }, // we want only instruments corresponding to the userId in req.params
        attributes: [], // we don't want any info from user model
      });
      const playedInstruments = [];
      //console.log(playedInstrumentData)
      playedInstrumentData[0].instruments.forEach((instrument) => {
        //converting into array containing instrument: experience
        console.log(instrument.userInstrument)
        playedInstruments.push({
          instrument:{
            value:instrument.id,
            label:instrument.name,
          },
          highestQualification: {
            value: instrument.userInstrument.highestQualification, 
            label: instrument.userInstrument.highestQualification
          },
          qualificationInstitution: instrument.userInstrument.qualificationInstitution,
        }
        );
      });
      return res.json({ success: true, playedInstruments });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async addPlayedInstrument(req, res) {
    const { userId } = req.params;
    const { instrumentId, instrumentExperience } = req.body;
    try {
      const newPlayedInstrument = await this.userInstrumentModel.create({
        userId,
        instrumentId,
        instrumentExperience,
      });
      return res.json({ success: true, newPlayedInstrument });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async removePlayedInstrument(req, res) {
    const { userId, instrumentId } = req.params;
    try {
      await this.userInstrumentModel.destroy({
        where: {
          userId,
          instrumentId,
        },
      });
      return res.json({ success: true });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async editInstrumentExperience(req, res) {
    const { userId, instrumentId } = req.params;
    const { instrumentExperience } = req.body;
    try {
      await this.userInstrumentModel.update(
        { instrumentExperience },
        {
          where: {
            userId,
            instrumentId,
          },
        }
      );
      return res.json({ success: true });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getGenres(req, res) {
    const { userId } = req.params;
    try {
      const genreInterests = await this.genreModel.findAll({
        where: { "$users.id$": userId },
        include: { model: this.model, attributes: [] },
        attributes: ["name"],
      });
      return res.json({ success: true, genreInterests });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async addGenreInterest(req, res) {
    const { userId } = req.params;
    const { genreId } = req.body;
    console.log("accessed method");
    try {
      const addingUser = await this.model.findByPk(userId); // is there a way to eager loading this?
      const newGenreInterest = await addingUser.addGenre(genreId);
      return res.json({ success: true, newGenreInterest });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async removeGenreInterest(req, res) {
    const { userId, genreId } = req.params;
    try {
      const removingUser = await this.model.findByPk(userId); // is there a way to eager loading this? Not unless we want to call the joint model
      await removingUser.removeGenre(genreId);
      return res.json({ success: true });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async assignArtists(req, res) {
    const { userId } = req.params;
    const { artistsList} = req.body;  
    try {
      const listToSet = [];
      const listToCreate = [];
      const allArtists = await this.artistModel.findAll();//getAll and check input vs getAll results
      const artistNamesToIds = {};
      allArtists.forEach((artist) => {
        artistNamesToIds[artist.name] = artist.id
      })
      artistsList.forEach((name) => {
        if (name in artistNamesToIds) {
          listToSet.push(artistNamesToIds[name])//for those in the getAll results, get their id
        } else {
          listToCreate.push({ name })
        }
      })
      //for those not in getAll results, bulkCreate(need to return ids);
      const createdArtists = await this.artistModel.bulkCreate(listToCreate, { returning: true }) 
      const createdIds = createdArtists.map((artist) => artist.dataValues.id)
      const finalArtistIds = listToSet.concat(createdIds)
      const addingUser = await this.model.findByPk(userId);
      const response = await addingUser.setArtists(finalArtistIds)
      return res.json({ success: true, response });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async assignGenres(req, res) {
    const { userId } = req.params;
    const { genresList} = req.body;  
    try {
      const listToSet = [];
      const listToCreate = [];
      const allGenres = await this.genreModel.findAll();//getAll and check input vs getAll results
      const genreNamesToIds = {};
      allGenres.forEach((genre) => {
        genreNamesToIds[genre.name] = genre.id
      })
      genresList.forEach((name) => {
        if (name in genreNamesToIds) {
          listToSet.push(genreNamesToIds[name])//for those in the getAll results, get their id
        } else {
          listToCreate.push({ name })
        }
      })
      //for those not in getAll results, bulkCreate(need to return ids);
      const createdGenres = await this.genreModel.bulkCreate(listToCreate, { returning: true }) 
      console.log(createdGenres)
      const createdIds = createdGenres.map((genre) => genre.dataValues.id)
      //combine ids and setGenres
      const finalGenreIds = listToSet.concat(createdIds)
      const addingUser = await this.model.findByPk(userId);
      const response = await addingUser.setGenres(finalGenreIds)
      return res.json({ success: true, response });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async assignInstruments(req, res) {
    const { userId } = req.params;
    const { userInstrumentsList } = req.body; // array of {instrument: {value: instrumentId, label: instrumentName},instrumentExperience: ""}
    const userInstrumentObjs = userInstrumentsList.map((entry)=>{
      return {userId, instrumentId: entry.instrument.value, instrumentExperience: entry.instrumentExperience}
    }) 
    try {
      await this.userInstrumentModel.destroy({
        where: {userId},
      });
      const createdUserInstruments = await this.userInstrumentModel.bulkCreate(userInstrumentObjs, {returning: true})
      return res.json({ success: true, createdUserInstruments });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  } 
}


module.exports = UsersController;
