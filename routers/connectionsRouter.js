const express = require("express");
const router = express.Router();

class ConnectionsRouter {
  constructor(controller, jwtAuth) {
    this.controller = controller;
    this.jwtAuth = jwtAuth;
  }
  routes() {
    router.use(this.jwtAuth.bind(this.jwtAuth));
    router.get("/:userId", (req, res) =>
      this.controller.getUsersConnections(req, res)
    );
    router.post("/", (req, res) =>
      this.controller.newConnection(req, res)
    );
    router.put("/", (req, res) =>
      this.controller.updateConnection(req, res)
    );
    router.delete("/:requesterId/:requestedId", (req, res) =>
      this.controller.deleteConnection(req, res)
    );
    return router;
  }
}

module.exports = ConnectionsRouter;
