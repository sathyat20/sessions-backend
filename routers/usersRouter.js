const express = require("express");
const router = express.Router();

class UsersRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.get("/", this.controller.getAll.bind(this.controller));
    router.get("/:userId", this.controller.getOne.bind(this.controller));

    router.get(
      "/:userId/joinedChatrooms",
      this.controller.getAllJoinedChatrooms.bind(this.controller)
    );

    router.post("/", this.controller.postOne.bind(this.controller));
    router.post(
      "/postNewMessage",
      this.controller.postMessageToChatroom.bind(this.controller)
    );
    router.put("/:userId", this.controller.putOne.bind(this.controller));
    return router;
  }
}

module.exports = UsersRouter;
