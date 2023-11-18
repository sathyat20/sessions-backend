const BaseController = require("./baseController");

class ChatroomsController extends BaseController {
  constructor(model, userModel, chatroomMessageModel) {
    super(model);
    this.userModel = userModel;
    this.chatroomMessageModel = chatroomMessageModel;
  }

  getChatroomDetails = async (req, res) => {
    const { chatId } = req.params;

    try {
      const chatroom = await this.model.findByPk(chatId);

      return res.json({ success: true, data: chatroom });
    } catch (err) {
      return res.status(400).json({ success: false, msg: err.message });
    }
  };

  getAllChatroomMessages = async (req, res) => {
    const { chatId } = req.params;
    try {
      const chatroom = await this.model.findByPk(chatId);
      const allChatMessages = await chatroom.getUserChatroomMessages();

      return res.json({ success: true, data: allChatMessages });
    } catch (err) {
      return res.status(400).json({ success: false, msg: err.message });
    }
  };

  getAllChatroomUsers = async (req, res) => {
    const { chatId } = req.params;

    try {
      const chatroom = await this.model.findByPk(chatId);
      const allChatroomUsers = await chatroom.getUsers();

      return res.json({ success: true, data: allChatroomUsers });
    } catch (err) {
      return res.status(400).json({ success: false, msg: err.message });
    }
  };

  getAllChatroomAttachments = async (req, res) => {
    const { chatId } = req.params;

    try {
      const chatroom = await this.model.findByPk(chatId);
      const allAttachments = await chatroom.getAttachments();

      return res.json({ success: true, data: allAttachments });
    } catch (err) {
      return res.status(400).json({ success: false, msg: err.message });
    }
  };
}

module.exports = ChatroomsController;
