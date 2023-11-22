const BaseController = require("./baseController");

class ArtistsController extends BaseController {
  constructor(model, userArtistModel) {
    super(model); 
    this.userArtistModel = userArtistModel;
  }
  async bulkAddArtistInterest(req, res) {
    const { userId } = req.params;
    const { artists } = req.body; // array of artist names
    console.log(artists)
    const artistObjects = artists.map((artistId) => {
      return {userId:parseInt(userId), artistId:artistId}
    })
    console.log(artistObjects)
    try {
      const newArtistInterests = await this.userArtistModel.bulkCreate(artistObjects); // need to create the model
      return res.json({ success: true, newArtistInterests });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}


module.exports = ArtistsController