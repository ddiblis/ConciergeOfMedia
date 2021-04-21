const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./comics.controller");

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

router
  .route("/comicextra")
  .get(controller.getExtra)
  .all(methodNotAllowed)

router  
  .route("/viewcomics")
  .get(controller.getView)
  .all(methodNotAllowed)

router
  .route("/webtoons")
  .get(controller.getToons)
  .all(methodNotAllowed)

module.exports = router