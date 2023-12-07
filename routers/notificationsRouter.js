const express = require("express");
const router = express.Router();

class NotificationsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.get("/:userId", this.controller.getUsersNotifications.bind(this.controller));
    router.post("/", this.controller.addNotification.bind(this.controller));
    router.put("/:notificationId", this.controller.updateNotification.bind(this.controller))
    return router;
  }
}

module.exports = NotificationsRouter;
