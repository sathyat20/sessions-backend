const express = require("express");
const router = express.Router();

class ConnectionsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.get("/:userId", this.controller.getUsersConnections.bind(this.controller));
    router.post("/", this.controller.newConnection.bind(this.controller));
    router.put("/", this.controller.updateConnection.bind(this.controller))
    router.delete("/:requesterId/:requestedId", this.controller.deleteConnection.bind(this.controller));
    return router;
  }
}

module.exports = ConnectionsRouter;
