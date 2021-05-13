const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./tv.controller");

router
  .route("/")
  .all(methodNotAllowed)

router
  .route("/solarmovie")
  .get(controller.getSolar)
  .all(methodNotAllowed)

router  
  .route("/movies123")
  .get(controller.get123)
  .all(methodNotAllowed)

router  
  .route("/kissanime")
  .get(controller.getKiss)
  .all(methodNotAllowed)

router
  .route("/animeheaven")
  .get(controller.getHeaven)
  .all(methodNotAllowed)

module.exports = router