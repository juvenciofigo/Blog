var express = require("express");
var router = express.Router();
const Category = require("../models/Categories");
const Article = require("../models/Articles");
const bcrypt = require("bcryptjs");

const User = require("../models/Users");

/* GET users listing. */
router.get("/admin/users", function (req, res, next) {
    res.send("respond with a resource");
});

router.get("/admin/users/create", function (req, res, next) {
    res.render("./pages/admin/users/create", { headTitle: "Novo usuário" });
});

router.get("/admin/users/login", function (req, res, next) {
    res.render("./pages/admin/users/login", { headTitle: "Novo usuário" });
});

router.post("/admin/users/save", function (req, res, next) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({ email: email }).then((user) => {
        if (user == undefined) {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);

            User.create({
                email: email,
                password: hash,
                name: name,
            })
                .then(() => res.redirect("/"))
                .catch(() => res.redirect("/"));
        } else {
            res.redirect("/admin/users/create");
        }
    });
});

module.exports = router;
