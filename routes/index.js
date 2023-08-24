const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const Category = require("../models/Categories");
const Article = require("../models/Articles");

router.get("/", function (req, res) {
    Article.findAll().then((article) => {
        Category.findAll().then((categories) => {
            res.render("index", { articles: article, categories: categories, headTitle: "Bem vindo" });
        });
    });
});

router.get("/admin", (req, res) => {
    res.render("./pages/admin/indexAdmin", { headTitle: "Juvencio Figo| Bem vindo" });
});

module.exports = router;
