const express = require("express");
const router = express.Router();

class InstrumentsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.get("/", this.controller.getAll.bind(this.controller));
    router.get("/selectable", this.controller.getAllSelectable.bind(this.controller));
    router.post("/", this.controller.postOne.bind(this.controller));
    router.delete("/:id", this.controller.deleteOne.bind(this.controller));
    router.post("/findorcreate", this.controller.findOrCreateOne.bind(this.controller));
    // router.post("/:userId", this.controller.bulkAddInstruments.bind(this.controller));
    return router;
  }
}

module.exports = InstrumentsRouter;
