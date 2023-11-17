const BaseController = require("./baseController");

class UsersController extends BaseController {
  constructor(model, chatroomModel, chatroomMessageModel) {
    super(model);
    this.chatroomModel = chatroomModel;
    this.chatroomMessageModel = chatroomMessageModel;
  }

  async getOne(req, res) {
    const { userId } = req.params;
    try {
      const user = await this.model.findByPk(
        userId
        // {
        //     include:
        //     [
        //         //to be inserted later
        //     ]
        // }
      );
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
    if (!fullName || !profilePictureUrl || !bio || !experience) {
      res.status(400).json({ success: false, msg: "input error" });
    }
    try {
      const editedUser = await this.model.update(
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
    const { userId } = req.params;
    try {
      const user = await this.model.findByPk(userId);
      const allJoinedChatrooms = await user.getChatrooms();
      return res.json({ success: true, data: allJoinedChatrooms });
    } catch (err) {
      return res.status(400).json({ success: false, msg: err.message });
    }
  }

  async postMessageToChatroom(req, res) {
    const { userId, chatroomId, content } = req.body;

    if (!userId || !chatroomId || !content) {
      return res.status(400).json({ success: false, msg: "Input error!" });
    }

    // console.log("testing");
    // console.log(userId, chatroomId, content);

    try {
      // console.log(this.chatroomMessageModel);
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
}

module.exports = UsersController;
