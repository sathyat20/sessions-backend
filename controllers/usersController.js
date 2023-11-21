const BaseController = require("./baseController");
const bcrypt = require("bcrypt"); // hashing User inputs on Sign Up / Log In
const jwt = require("jsonwebtoken");
require("dotenv").config();

class UsersController extends BaseController {
  constructor(
    model,
    personalVideoClipModel,
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
    this.personalVideoClipModel = personalVideoClipModel;
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

    return res.json({ success: true, data: token });
  }

  /** User Methods */
  async getCurrentUser(req, res) {
    const userId = req.userId;
    try {
      const user = await this.model.findByPk(userId);
      return res.json({ success: true, user });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getOne(req, res) {
    const { userId } = req.params;
    try {
      const user = await this.model.findByPk(userId);
      return res.json({ success: true, user });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async postOne(req, res) {
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

  async putOne(req, res) {
    const { userId } = req.params;
    const { fullName, profilePictureUrl, bio, experience } = req.body;
    if (!fullName && !profilePictureUrl && !bio && !experience) {
      res.status(400).json({ success: false, msg: "input error" });
    }
    try {
      const editedUser = await this.model.update(
        // updateObject,
        {
          fullName,
          profilePictureUrl,
          bio,
          experience,
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

  //need method to add videoclip and change associated videoclips
  //when editing user, all videoclips will be pulled and displayed? Better not...keep it as a separate method
  //add videoclip button
  //edit videoclip and delete buttons

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
      const comments = await this.personalVideoClipModel.findAll({
        where: { userId },
        order: ["createdAt"],
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async postClip(req, res) {
    const { userId } = req.params;
    const { hostUrl } = req.body;
    try {
      const newClip = await this.model.createPersonalVideoClip(
        { hostUrl },
        { where: { id: userId } }
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
      const editedClip = await this.personalVideoClipModel.update(
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
    const { userId, clipId } = req.params;
    try {
      await this.personalVideoClipModel.destroy({
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
      });
      // const artistInterests = await this.model.findAll({
      //   include: this.artistModel,
      //   where: {id:userId}
      // })
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
      // const newArtistInterest = await this.model.addArtist(artistId, {
      //   where: {id:userId},
      // })
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
            attributes: ["name"], //we only want name from instrument model
            through: {
              model: this.userInstrumentModel,
              attributes: ["instrumentExperience"], //specify we only want instrumentExperience from userInstrument models
            },
          },
        ],
        order: [
          [
            this.instrumentModel,
            this.userInstrumentModel,
            "instrumentExperience",
            "DESC",
          ],
        ], // sort instruments in descending order by instrumentExp col of userInstrument model nested in Instrument model
        where: { id: userId }, // we want only instruments corresponding to the userId in req.params
        attributes: [], // we don't want any info from user model
      });
      const playedInstruments = [];
      playedInstrumentData[0].instruments.forEach((instrument) => {
        //converting into array containing instrument: experience
        playedInstruments.push([
          instrument.name,
          instrument.userInstrument.instrumentExperience,
        ]);
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
}

module.exports = UsersController;
