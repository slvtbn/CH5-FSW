var express = require('express');
var router = express.Router();
const CarControl = require("../controller/carControl");
const { Cars } = require("../models");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get("/", CarControl.getAllCars);
router.get("/cars/create", function (req, res, next) {
  res.render("cars/createCar", { title: "Create Car" });
});
router.get("/cars/update/:id", CarControl.editCars);

router.use("/cars", require('./car'));

module.exports = router;
