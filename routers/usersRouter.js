const express = require("express");
const router = express.Router();

class UsersRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    //basic user methods
    router.get("/", this.controller.getAll.bind(this.controller));
    router.get("/:userId", this.controller.getOne.bind(this.controller));

    router.get(
      "/:userId/joinedChatrooms",
      this.controller.getAllJoinedChatrooms.bind(this.controller)
    );

    router.post("/", this.controller.postOne.bind(this.controller));
    router.put("/:userId", this.controller.putOne.bind(this.controller));

    // Message Related Functions
    router.post(
      "/postMessageAttachment",
      this.controller.postMessageAttachment.bind(this.controller)
    );

    router.post(
      "/postNewMessage",
      this.controller.postMessageToChatroom.bind(this.controller)
    );

    //user video clip methods
    router.get(
      "/:userId/clips",
      this.controller.getAllClips.bind(this.controller)
    );
    router.post(
      "/:userId/clips",
      this.controller.postClip.bind(this.controller)
    );
    router.put(
      "/:userId/clips/:clipId",
      this.controller.putClip.bind(this.controller)
    );
    router.delete(
      "/:userId/clips/:clipId",
      this.controller.deleteClip.bind(this.controller)
    );

    //user's artist interests methods
    router.get(
      "/:userId/artists",
      this.controller.getArtists.bind(this.controller)
    );
    router.post(
      "/:userId/artists/",
      this.controller.addArtistInterest.bind(this.controller)
    );
    router.delete(
      "/:userId/artists/:artistId",
      this.controller.removeArtistInterest.bind(this.controller)
    );
    //user's instruments methods
    router.get(
      "/:userId/instruments",
      this.controller.getInstruments.bind(this.controller)
    );
    router.post(
      "/:userId/instruments/",
      this.controller.addPlayedInstrument.bind(this.controller)
    );
    router.delete(
      "/:userId/instruments/:instrumentId",
      this.controller.removePlayedInstrument.bind(this.controller)
    );
    router.put(
      "/:userId/instruments/:instrumentId",
      this.controller.editInstrumentExperience.bind(this.controller)
    );

    return router;
  }
}

module.exports = UsersRouter;
