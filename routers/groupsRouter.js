const express = require("express");
const router = express.Router();

class GroupsRouter {
  constructor(controller, jwtAuth) {
    this.controller = controller;
    this.jwtAuth = jwtAuth;
  }
  routes() {
    // JWT Auth Middleware
    router.use(this.jwtAuth.bind(this.jwtAuth));
    router.get("/", this.controller.getAll.bind(this.controller));
    router.post("/", this.controller.postOne.bind(this.controller));
    router.get("/:userId", this.controller.getUserGroups.bind(this.controller));
    router.post("/newgroup", this.controller.createGroup.bind(this.controller));

    return router;
  }
}

module.exports = GroupsRouter;
