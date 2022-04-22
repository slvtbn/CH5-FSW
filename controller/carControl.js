const {
  Cars
} = require("../models");

module.exports = class {
  static addCars(req, res, next) {
    const {
      nama,
      sewa,
      ukuran,
      foto
    } = req.body;
    let errors = [];
    if (!nama || !sewa || !ukuran || !foto) {
      errors.push({
        msg: "Silahkan Lengkapi data"
      });
      console.log("Silahkan Lengkapi data");
    }
    if (errors.length > 0) {
      res.render("cars/createCar", {
        errors,
        title: "Create Car"
      });
    } else {
      Cars.create({
          nama: req.body.nama,
          sewa: req.body.sewa,
          ukuran: req.body.ukuran,
          foto: req.body.foto,
        })
        .then((result) => {
          errors.push({
            msg: "Data berhasil ditambahkan"
          });
          res.render("cars/createCar", {
            errors,
            result,
            title: "Create Car"
          });
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    }
    res.redirect('/')
  }

  static getAllCars(req, res, next) {
    Cars.findAll()
      .then((result) => {
        res.render("cars/index", {
          ListCars: result
        });
        // res.status(200).send(
        //   {data : result}
        // )
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  }
  static editCars(req, res, next) {
    const id = req.params.id;
    Cars.findByPk(id)
      .then((result) => {
        console.log(result);
        res.render("cars/updateCar", {
          data: result,
          title: "Update Car"
        });
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  }
  static updateCars(req, res, next) {
    const id = req.params.id;
    let errors = [];
    Cars.update(req.body, {
        where: {
          id: id
        },
      })
      .then((result) => {
        if (result == 1) {
          errors.push({
            msg: "Data berhasil terupdate"
          });
          console.log(req.body);
          res.render("cars/updateCar", {
            errors,
            data: req.body,
            title: "Update Car",
          });
        } else {
          res.redirect(`${id}`);
          errors.push({
            msg: "Data gagal terupdate"
          });
        }
      })
      .catch((err) => {
        console.log(err)
        res.status(400).send(err);
      });

    res.redirect('/')
  }

  static deleteCars(req, res, next) {
    const id = req.params.id;
    Cars.destroy({
        where: {
          id: id
        },
      })
      .then((result) => {
        if (result == 1) {
          res.redirect("/");
        } else {
          res.send({
            message: `cannot delete id=${id}`,
          });
        }
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  }
};