const express = require("express");
const router = express.Router();

class ChatroomsRouter {
  constructor(chatroomController) {
    this.controller = chatroomController;
  }

  // routes() {
  //   router.get(
  //     "/:chatId",
  //     this.controller.getAllChatroomMessages.bind(this.controller)
  //   );
  //   return router;
  // }

  routes = () => {
    router.get(
      "/:chatId/getAllChatroomMessages",
      this.controller.getAllChatroomMessages
    );

    router.get(
      "/:chatId/getChatroomDetails",
      this.controller.getChatroomDetails
    );

    router.get(
      "/:chatId/getAllChatroomUsers",
      this.controller.getAllChatroomUsers
    );

    router.get(
      "/:chatId/getAllChatroomAttachments",
      this.controller.getAllChatroomAttachments
    );

    return router;
  };
}

module.exports = ChatroomsRouter;
