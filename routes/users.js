var express = require("express");
var router = express.Router();
const Category = require("../models/Categories");
const Article = require("../models/Articles");
const bcrypt = require("bcryptjs");

const User = require("../models/Users");

/* GET users listing. */
router.get("/admin/users", function (req, res, next) {
    User.findAll().then((users) => {
        res.json( { headTitle: "Usuários ", users: users });
    });
});

router.get("/admin/users/create", function (req, res, next) {
    res.render("./pages/admin/users/create", { headTitle: "Novo usuário" });
});

router.get("/admin/users/login", function (req, res, next) {
    res.render("./pages/admin/users/login", { headTitle: "Novo usuário" });
});

//  Save new user
router.post("/admin/users/save", function (req, res, next) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({ email: email }).then((email) => {
        // if () {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);

            User.create({
                email: email,
                password: hash,
                name: name,
            })
                .then(() => res.redirect("/"))
                .catch(() => res.redirect("/"));
        // } else {
        //     // Redirecionar de volta ao formulário de criação com mensagem de erro
        //     res.redirect("/admin/users/create?error=email");
        // }
    });
});

// Delete a user

router.post("/admin/users/delete", function (req, res) {
    var id = req.body.id;

    if (id != undefined) {
        if (!isNaN(id)) {
            User.destroy({
                where: { id: id },
            }).then(() => {
                res.redirect("/admin/users");
            });
        } else {
            res.redirect("/admin/users");
        }
    } else {
        res.redirect("/admin/users");
    }
});

module.exports = router;
