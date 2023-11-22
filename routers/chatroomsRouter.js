const express = require("express");
const router = express.Router();

class ChatroomsRouter {
  constructor(chatroomController, jwtAuth) {
    this.controller = chatroomController;
    this.jwtAuth = jwtAuth;
  }

  // routes() {
  //   router.get(
  //     "/:chatId",
  //     this.controller.getAllChatroomMessages.bind(this.controller)
  //   );
  //   return router;
  // }

  routes = () => {
    // JWT Auth Middleware
    router.use(this.jwtAuth);

    // Authenticated-User Methods
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

    router.post("/addUserToChatroom", this.controller.addOneUserToChatroom);
    router.put("/:chatId", this.controller.updateChatroomDetails);
    return router;
  };
}

module.exports = ChatroomsRouter;
