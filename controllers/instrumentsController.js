const BaseController = require("./baseController");

class InstrumentsController extends BaseController {
  constructor(model, userInstrumentModel) {
    super(model); 
    this.userInstrumentModel = userInstrumentModel;
  }

  async addPlayedInstrument(req, res) {
    const userId  = req.userId;
    const { instrumentId, highestQualification, qualificationInstitution } = req.body;
    try {
      const newPlayedInstrument = await this.userInstrumentModel.create({
        userId,
        instrumentId,
        highestQualification,
        qualificationInstitution
      });
      return res.json({ success: true, newPlayedInstrument });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async removePlayedInstrument(req, res) {
    const { userInstrumentId } = req.params;
    try {
      await this.userInstrumentModel.destroy({
        where: {
          id: userInstrumentId
        },
      });
      return res.json({ success: true });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async editPlayedInstrument(req, res) {
    const { userInstrumentId } = req.params;
    const { instrumentId, highestQualification, qualificationInstitution } = req.body;
    try {
      await this.userInstrumentModel.update(
        { instrumentId, highestQualification, qualificationInstitution},
        {
          where: {
            id:userInstrumentId
          },
        }
      );
      return res.json({ success: true });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

}

module.exports = InstrumentsController