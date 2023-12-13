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
    router.get("/group/:groupId", this.controller.getGroup.bind(this.controller));
    router.post("/", this.controller.postOne.bind(this.controller));
    router.get("/search",this.controller.getMultiFilteredGroups.bind(this.controller));
    router.get("/:userId", this.controller.getUserGroups.bind(this.controller));
    router.post("/newgroup", this.controller.createGroup.bind(this.controller));
    router.put("/edit/:groupId", this.controller.updateGroup.bind(this.controller));    
    router.post("/addMember", this.controller.addMember.bind(this.controller));
    router.delete("/:groupId/:userId", this.controller.removeMember.bind(this.controller));
    return router;
  }
}

module.exports = GroupsRouter;
