const BaseController = require("./baseController");

class GenresController extends BaseController {
  constructor(model, userGenreModel) {
    super(model); 
    this.userGenreModel = userGenreModel;
  }
  // async bulkAddGenreInterest(req, res) {
  //   const { userId } = req.params;
  //   const { genres } = req.body; // array of genre names
  //   const genreObjects = genres.map((genreId) => {userId, genreId})
  //   try {
  //     const newGenreInterests = await this.userGenreModel.bulkCreate(genreObjects); // need to create the model
  //     return res.json({ success: true, newGenreInterests });
  //   } catch (err) {
  //     return res.status(400).json({ error: true, msg: err });
  //   }
  // }
}

module.exports = GenresController