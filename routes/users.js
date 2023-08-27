var express = require("express");
var router = express.Router();
const Category = require("../models/Categories");
const Article = require("../models/Articles");
const bcrypt = require("bcryptjs");
const User = require("../models/Users");

/* GET users listing. */
router.get("/admin/users", function (req, res, next) {
    User.findAll().then((users) => {
        res.render("./pages/admin/users/users", { headTitle: "Usuários ", users: users });
    });
});

//login
router.get("/admin/users/login", function (req, res, next) {
    res.render("./pages/admin/users/login", { headTitle: "Novo usuário" });
});

// Edit a user
router.get("/admin/users/edit/:id", function (req, res) {
    const id = req.params.id;

    User.findByPk(id).then(function (user) {
        var id = user.id;
        var name = user.name;
        var email = user.email;
        res.render("./pages/admin/users/editUser", { name, email, id, headTitle: "Atualizar usuário" });
    });
});

// Create a new user
router.get("/admin/users/create", function (req, res, next) {
    res.render("./pages/admin/users/create", { headTitle: "Novo usuário" });
});

//  Update user
router.post("/admin/users/update", function (req, res, next) {
    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    User.findAndCountAll({ where: { email: email } })
        .then((existingUser) => {
            if (existingUser.count < 2) {
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(password, salt);

                User.update(
                    {
                        email: email,
                        password: hash,
                        name: name,
                    },
                    { where: { id: id } }
                )
                    .then(() => res.redirect("/admin/users"))
                    .catch(() => res.redirect("/"));
            } else {
                res.redirect("/admin/users");
            }
        })
        .catch(() => {
            res.redirect("/admin/users");
        });
});

//  Save new user
router.post("/admin/users/save", function (req, res, next) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({ where: { email: email } }).then((existingUser) => {
        if (existingUser == undefined) {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);

            User.create({
                email: email,
                password: hash,
                name: name,
            })
                .then(() => res.redirect("/admin/users"))
                .catch(() => res.redirect("/"));
        } else {
            res.redirect("/admin/users/create?error=email");
        }
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

router.post("/authentication", function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({ where: { email: email } }).then((user) => {
        if (user !== undefined && user !== null) {
            const correct = bcrypt.compareSync(password, user.password);
            if (correct) {
                req.session.user = {
                    id: user.id,
                    email: user.email,
                };
                res.json(req.session.user);
            } else {
                res.redirect("/admin/users/login"); //erro de senha
            }
        } else {
            res.redirect("/admin/users/login"); //erro de email
        }
    });
});
module.exports = router;
