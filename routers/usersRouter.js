const express = require("express");
const router = express.Router();

class UsersRouter {
  constructor(controller, jwtAuth) {
    this.controller = controller;
    this.jwtAuth = jwtAuth;
  }

  routes() {
    // JWT Auth Sign Up/Sign In Functions
    router.post("/jwtSignUp", this.controller.jwtSignUp.bind(this.controller));
    router.post(
      "/jwtLogIn",
      this.controller.jwtLogInUser.bind(this.controller)
    );

    // JWT Auth Middleware
    router.use(this.jwtAuth.bind(this.jwtAuth));

    /**
     *  Authorized-User Methods
     * */

    //basic user methods
    router.get("/", this.controller.getAll.bind(this.controller));

    router.get(
      "/getCurrentUser",
      this.controller.getCurrentUser.bind(this.controller)
    );

    router.get(
      "/joinedChatrooms",
      this.controller.getAllJoinedChatrooms.bind(this.controller)
    );

    router.get("/:userId", this.controller.getOne.bind(this.controller));

    router.post("/", this.controller.postOne.bind(this.controller));
    router.put("/:userId", this.controller.putOne.bind(this.controller));

    router.post(
      "/addProfilePicture",
      this.controller.addProfilePicture.bind(this.controller)
    );

    // Message Related Functions
    router.post(
      "/postMessageAttachment",
      this.controller.postMessageAttachment.bind(this.controller)
    );

    router.post(
      "/postNewMessage",
      this.controller.postMessageToChatroom.bind(this.controller)
    );

    router.post(
      "/createNewChatroom",
      this.controller.createChatroomForOneUser.bind(this.controller)
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
