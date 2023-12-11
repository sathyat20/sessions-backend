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

  async getUserGroups(req, res) {
    const userId = req.params.userId;

    try {
      const groups = await this.groupModel.findAll({
        include: [
          {
            model: this.userModel,
            where: { id: userId },
            as: "Users",
          },
          {
            model: this.videoClipModel,
            as: "videoClips",
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
}

module.exports = GroupsController;
