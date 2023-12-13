const BaseController = require("./baseController");

class GroupsController extends BaseController {
  constructor(
    model,
    userModel,
    userGroupModel,
    genreGroupModel,
    instrumentGroupModel,
    genreModel,
    instrumentModel,
    videoClipModel
  ) {
    super(model);
    this.userModel = userModel;
    this.groupModel = model;
    this.userGroupModel = userGroupModel;
    this.genreGroupModel = genreGroupModel;
    this.instrumentGroupModel = instrumentGroupModel;
    this.genreModel = genreModel;
    this.instrumentModel = instrumentModel;
    this.videoClipModel = videoClipModel;
  }

  // async getUserGroups(req, res) {
  //   const userId = req.params.userId;

  //   try {
  //     const groups = await this.userModel.findOne({
  //       where: {
  //         id: userId,
  //       },
  //       include: [
  //         {
  //           model: this.groupModel,
  //           include: [
  //             {
  //               model: this.videoClipModel,
  //             },
  //           ],
  //         },
  //       ],
  //       // raw: true,
  //       // nest: true
  //     });

  //     return res.json(groups);
  //   } catch (err) {
  //     return res.status(400).json({ error: true, msg: err.message });
  //   }
  // }

  // async getUserGroups(req, res) {
  //   const userId = req.params.userId;

  //   try {
  //     const groups = await this.groupModel.findAll({
  //       include: [
  //         {
  //           model: this.userGroupModel,
  //           where: { userId: userId },
  //           include: [
  //             {
  //               model: this.userModel,
  //             },
  //           ],
  //         },
  //         {
  //           model: this.videoClipModel,
  //         },
  //       ],
  //       // raw: true,
  //       // nest: true
  //     });

  //     return res.json(groups);
  //   } catch (err) {
  //     return res.status(400).json({ error: true, msg: err.message });
  //   }
  // }

async getUserGroups(req, res) {
    const userId = req.params.userId;

    try {
      // Fetch group IDs associated with the user
      const userGroups = await this.userGroupModel.findAll({
        where: { userId: userId },
        attributes: ["groupId"],
        raw: true,
      });
      const groupIds = userGroups.map((ug) => ug.groupId);

      // Fetch groups along with all associated users
      const groups = await this.groupModel.findAll({
        where: { id: groupIds },
        include: [
          {
            model: this.userGroupModel,
            include: [
              {
                model: this.userModel,
              },
            ],
          },
          {
            model: this.videoClipModel,
          },
          {
            model:this.genreModel,
          }
          // {
          //   model:this.userGroupModel
          // }
        ],
      });

      return res.json(groups);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }


  async createGroup(req, res) {
    console.log("UserId from req: ", req.userId);
    const {
      groupName,
      isPublic,
      ensembleType,
      careerStatus,
      bio,
      profilePictureUrl,
      videoClips, //an array
    } = req.body;

    const userId = req.userId;

    try {
      // Use group model to create a new group record
      const newGroup = await this.groupModel.create({
        groupName,
        isPublic,
        ensembleType,
        careerStatus,
        bio,
        profilePictureUrl,
      });

      // Add a new entry to the users_groups table to link the user who created the group
      await this.userGroupModel.create({
        groupId: newGroup.id,
        userId: userId,
        isAdmin: true,
      });

      if (videoClips && videoClips.length) {
        await Promise.all(
          videoClips.map(async (clipUrl) => {
            await this.videoClipModel.create({
              hostUrl: clipUrl,
              userId: userId,
              groupId: newGroup.id,
            });
          })
        );
      }

      return res.status(201).json(newGroup);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  async updateGroup(req, res) {
    const groupId = req.params.groupId;
    const {
      groupName,
      isPublic,
      ensembleType,
      careerStatus,
      bio,
      profilePictureUrl,
      videoClips,
    } = req.body;

    try {
      const group = await this.groupModel.findByPk(groupId);

      if (!group) {
        return res.status(404).json({ error: true, msg: "Group not found" });
      }

      if (groupName) group.groupName = groupName;
      if (isPublic != null) group.isPublic = isPublic;
      if (ensembleType) group.ensembleType = ensembleType;
      if (careerStatus) group.careerStatus = careerStatus;
      if (bio) group.bio = bio;
      if (profilePictureUrl) group.profilePictureUrl = profilePictureUrl;

      await group.save();

      if (videoClips && videoClips.length) {
        await Promise.all(
          videoClips.map(async (clip) => {
            await this.videoClipModel.create({
              hostUrl: clip.url,
              groupId: groupId,
            });
          })
        );
      }
      return res.status(200).json({ editedGroup: group });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }


  //http://localhost:8080/groups/search?genres=Classical
  //http://localhost:8080/groups/search?ensemble_type=Jazz%20Band&genres=Jazz
  async getMultiFilteredGroups(req, res) {
    //pull the inputs from query params
    const selectionsArray = Object.entries(req.query)
    
    //initialising the query inputs
    const tablesToInclude = [{ // we want to include these tables
      model:this.genreModel,
    }]
    const whereObject = {} //at the same time we also need to generate the where clause

    //iterating through the unpacked selections and populating the query inputs
    selectionsArray.forEach((selection)=>{ 
      const category = selection[0];
      console.log(category)
      const chosenValue = selection[1];
      if (category === 'musicianship') {
        whereObject[`careerStatus`] = chosenValue;
      } else if (category === 'ensemble_type') {
        whereObject[`${category}`] = chosenValue;
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

  async addMember(req,res) {
    const {groupId, userId, isAdmin} = req.body;
    try {
      const newMember = await this.userGroupModel.create({
        userId,
        groupId,
        isAdmin,
      });
      return res.json({ success: true, newMember });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async removeMember(req,res) {
    const { userId, groupId } = req.params;
    try {
      await this.userGroupModel.destroy({
        where: {
          userId,
          groupId,
        },
      });
      return res.json({ success: true });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  //router.get("/group/:groupId", this.controller.getGroup.bind(this.controller));
async getGroup(req, res) {
    const {groupId} = req.params;
    try {
      const group = await this.groupModel.findOne({
        where: {id:groupId},
        include:[
          {
            model:this.userGroupModel,
            include: [
              {
                model:this.userModel,
              },
            ],
          },
          {
            model:this.videoClipModel,
          },
          {
            model:this.genreModel,
          }
      ]
      });
      return res.json(group);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }
}

module.exports = GroupsController;
