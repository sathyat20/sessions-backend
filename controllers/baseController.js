class BaseController {
  constructor(model) {
    this.model = model;
  }

  getAll = async (req, res) => {
    try {
      const output = await this.model.findAll();
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getAllSelectable = async (req, res) => {
    try {
      //const response = await this.model.findAll({attributes: ["id", "name"]}); // this works
      const response = await this.model.findAll({attributes: [["id","value"], ["name", "label"]]}); // this doesn't
      return res.json(response);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  async postOne(req, res) {
    //intended to serve artist, genre, song
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ success: false, msg: "input error" });
    }
    try {
      const newEntry = await this.model.create({ name });
      return res.json({ success: true, entry: newEntry });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
  async deleteOne(req, res) {
    //intended to serve artist, genre, song
    const { id } = req.params;
    try {
      await this.model.destroy({
        where: { id: id },
      });
      return res.json({ success: true });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
  async findOrCreateOne(req, res) {
    //intended to serve artist, genre, song, instrument
    const { name } = req.body;
    try {
      const [entry, createdStatus] = await this.model.findOrCreate({
        where: { name },
      });
      return res.json({ success: true, entry, createdStatus });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = BaseController;
