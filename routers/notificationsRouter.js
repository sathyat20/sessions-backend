const express = require("express");
const router = express.Router();

class NotificationsRouter {
  constructor(controller, jwtAuth) {
    this.controller = controller;
    this.jwtAuth = jwtAuth;
  }
  routes() {
    router.use(this.jwtAuth.bind(this.jwtAuth));
    router.get("/", this.controller.getUsersNotifications.bind(this.controller));
    router.post("/", this.controller.addNotification.bind(this.controller));
    router.put("/:notificationId", this.controller.updateNotification.bind(this.controller))
    return router;
  }
}

module.exports = NotificationsRouter;
