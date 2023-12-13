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

  async addGroupClip(req, res) {
    const groupId = req.params.groupId;
    const userId = req.userId;
    const { hostUrl } = req.body;

    try {
      const newClip = await this.videoClipModel.create({
        hostUrl,
        groupId,
        userId,
      });

      return res.status(201).json(newClip);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  async getGroupClips(req, res) {
    const groupId = req.params.groupId;

    try {
      // Fetch clips associated with the groupId
      const clips = await this.videoClipModel.findAll({
        where: { groupId: groupId },
      });

      if (!clips) {
        return res
          .status(404)
          .json({ error: true, msg: "No clips found for this group" });
      }

      return res.status(200).json(clips);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  async deleteGroupClip(req, res) {
    const clipId = req.params.clipId;

    try {
      const clip = await this.videoClipModel.findByPk(clipId);
      if (!clip) {
        return res.status(404).json({ error: true, msg: "Clip not found" });
      }

      await clip.destroy();
      return res.status(200).json({ message: "Clip deleted successfully" });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  async getGroupMembers(req, res) {
    const groupId = req.params.groupId;

    try {
      const userGroups = await this.userGroupModel.findAll({
        where: { groupId },
        include: [
          {
            model: this.userModel,
            attributes: ["id", "fullName", "profilePictureUrl"], 
          }
        ],
      });

      const members = userGroups.map((ug) => ({
        ...ug.user.get({ plain: true }), 
        isAdmin: ug.isAdmin, 
      }));

      return res.status(200).json(members);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }
}

module.exports = GroupsController;
