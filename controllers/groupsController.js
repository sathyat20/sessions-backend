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

}

module.exports = GroupsController;
