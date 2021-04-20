const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./manga.controller");

router
  .route("/")
  .all(methodNotAllowed)

router
  .route("/mangaraw")
  .get(controller.getRaw)
  .all(methodNotAllowed)

router  
  .route("/manganelo")
  .get(controller.getNelo)
  .all(methodNotAllowed)

router  
  .route("/mangafast")
  .get(controller.getFast)
  .all(methodNotAllowed)

module.exports = router