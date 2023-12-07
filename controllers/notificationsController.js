const BaseController = require("./baseController");
const { Op } = require("sequelize");

class NotificationsController extends BaseController {
  constructor(model, userModel) {
    super(model); 
  }

  async getUsersNotifications(req, res) {
    const { userId } = req.params;
    try {
        const notifications = await this.model.findAll({
            where: { userId },
          });
      return res.json({ success: true, notifications});
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async addNotification(req, res) { 
    const { userId, originTable, sourceId, action, details } = req.body;
    try {
        const newNotification = await this.model.create(
            { 
                userId,
                originTable,
                sourceId,
                action,
                details,
                hasBeenViewed: false,
             },
          );
      return res.json({ success: true, newNotification});
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async updateNotification(req, res) { 
    const { notificationId } = req.params;
    const { userId, originTable, sourceId, action, details, hasBeenViewed } = req.body;
    try {
        const updatedNotification = await this.model.update(
            { 
                userId,
                originTable,
                sourceId,
                action,
                details,
                hasBeenViewed
             },
            {
              where: {id: notificationId},
              returning: true,
            }
          );
      return res.json({ success: true, updatedNotification});
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
  
}

module.exports = NotificationsController