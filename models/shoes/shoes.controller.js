const express = require("express");
const router = express.Router();
const shoesService = require("./shoes.service");
// routes
router.post("/create", create);
router.get("/", getAll);
router.get("/current", getCurrent);
router.get("/:_id", getById);
router.put("/:_id", update);  
router.delete("/:_id", _delete);
module.exports = router;

function create(req, res, next) {
  shoesService
    .create(req.body,req, res)
    .catch((err) => next(err));
}
function update(req, res, next) {
  shoesService
    .update(req.params._id, req.body,res)
    .catch((err) => next(err));
}

function getAll(req, res, next) {
  shoesService
    .getAll(res)
    .then((users) => res.json(users))
    .catch((err) => next(err));
}

function getCurrent(req, res, next) {
  shoesService
    .getById(req.user.sub)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function getById(req, res, next) {
  shoesService
    .getById(req.params._id, req, res,)
    .then((user) => (user ? res.json({
      message: "ok",
      data: user,
    }) : res.sendStatus(404).json( {
      message: "Error: User not found for the given ID!"
    })))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  shoesService
    .delete(req.params._id,res)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

