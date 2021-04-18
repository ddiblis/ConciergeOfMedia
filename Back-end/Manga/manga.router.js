const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./manga.controller");

router
  .route("/mangaraw")
  .get(controller.getRaw)
  .all(methodNotAllowed)

router  
  .route("/manganelo")
  .get(controller.getNelo)
  .all(methodNotAllowed)

module.exports = router