const BaseController = require("./baseController");
const { Op } = require("sequelize");

class ConnectionsController extends BaseController {
  constructor(model, userModel, notificationModel) {
    super(model); 
    this.userModel = userModel;
    this.notificationModel = notificationModel;
  }
  async getUsersConnections(req, res) {
    const { userId } = req.params;
    try {
      const output = await this.model.findAll({
        where: { 
            [Op.or]:[{requesterId:userId}, {requestedId:userId}],
            status: "confirmed"
        },
        order: ["createdAt"],
        include: [{
            model: this.userModel,
            as: 'requesterRelation',
            attributes: ["id", "fullName", "profilePictureUrl"],
            where:{
                [Op.not]:[{id:userId}]
            },
            required:false
        },
        {
            model: this.userModel,
            as: 'requestedRelation',
             attributes: ["id", "fullName", "profilePictureUrl"],
            where:{
                [Op.not]:[{id:userId}]
            },
            required:false
        }
    ],
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async newConnection(req, res) {
    const { requesterId, requestedId } = req.body;
    try {
      const newConnection = await this.model.create(
        { 
            requesterId,
            requestedId, 
            status: 'pending',
        },
      );
      const notification  = await this.notificationModel.create(
        {
            userId:requestedId,
            originTable:"connections",
            sourceId: requesterId,
            action: "post",
            details: "",
            hasBeenViewed: false
        }
      )
      return res.json({ success: true, newConnection, notification });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async updateConnection(req, res) {
    const { requesterId, requestedId, status } = req.body;
    try {
      const editedConnection = await this.model.update(
        {status},
        {
          where: {
            requesterId,
            requestedId,
          },
          returning: true,
        }
      );
      return res.json({ success: true, editedConnection });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async deleteConnection(req, res) {
    const { requesterId, requestedId, } = req.params;
    try {
      await this.model.destroy({
        where: {
            requesterId,
            requestedId,
          },
      });
      return res.json({ success: true });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = ConnectionsController