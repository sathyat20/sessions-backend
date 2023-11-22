const BaseController = require("./baseController");

class InstrumentsController extends BaseController {
  constructor(model) {
    super(model); 
  }

  // async bulkAddInstruments(req, res) {
  //   const { userId } = req.params;
  //   const {instruments}  = req.body; // array of {instrument: {value: instrumentId, label: instrumentName},instrumentExperience: ""}
  //   console.log(instruments)
  //   const instrumentObjects = instruments.map((entry) => {
  //     return { userId: parseInt(userId), instrumentId: entry.instrument.value, instrumentExperience: entry.instrumentExperience }
  //   })
  //   console.log(instrumentObjects)
  //   try {
  //     const newUserInstruments = await this.userInstrumentModel.bulkCreate(instrumentObjects); // need to create the model
  //     return res.json({ success: true, newUserInstruments });
  //   } catch (err) {
  //     return res.status(400).json({ error: true, msg: err });
  //   }
  // }
}

module.exports = InstrumentsController