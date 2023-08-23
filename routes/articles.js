const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const Category = require("../models/Categories");
const Article = require("../models/Articles");

// User routes

// Show all articles

router.get("/articles/page/:num", (req, res) => {
    var page = req.params.page

    Article.findAndCountAll().then((article)=>{
        res.json(article);
    })
});



router.get("/articles", (req, res) => {
    Article.findAll().then((article) => {
        Category.findAll().then((categories) => {
            res.render("./pages/articles", { articles: article, categories: categories });
        });
    });
});

// Show one article
router.get("/articles/:slug", (req, res) => {
    var slug = req.params.slug;

    Article.findOne({ where: { slug: slug } })
        .then((article) => {
            if (article != undefined) {
                Category.findAll().then((categories) => {
                    res.render("./pages/showArticle", { article: article, categories: categories });
                });
            } else {
                res.render("/");
            }
        })
        .catch((error) => {
            res.render("/");
        });
});

// //  Admin routes
// Show article
router.get("/admin/articles", (req, res) => {
    Article.findAll({
        include: [{ model: Category }],
    })
        .then((article) => {
            res.render("./pages/admin/articles/articles", { article: article });
        })
        .catch((error) => {
            console.log(error);
        });
});
// Create new article
router.get("/admin/articles/new", (req, res) => {
    Category.findAll().then((categories) => {
        res.render("./pages/admin/articles/newArticles", { categories: categories });
    });
});
// Save new article
router.post("/articles/save", (req, res) => {
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    Article.create({
        title: title,
        body: body,
        slug: slugify(title),
        categoryId: category,
    }).then(() => {
        res.redirect("/admin/articles");
    });
});

module.exports = router;

// Edit article
router.get("/admin/articles/edit/:id", (req, res) => {
    var id = req.params.id;
    if (id !== undefined) {
        Article.findByPk(id)
            .then((article) => {
                Category.findAll().then((categories) => {
                    res.render("./pages/admin/articles/editArticle", { article: article, categories: categories });
                });
            })
            .catch((error) => {
                res.redirect(" /admin/articles");
            });
    } else {
        res.redirect("");
    }
});

//update article
router.post("/articles/update", (req, res) => {
    var id = req.body.id;
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    Article.update(
        {
            title: title,
            body: body,
            slug: slugify(title),
            categoryId: category,
        },
        { where: { id: id } }
    )
        .then(() => {
            res.redirect("/admin/articles");
        })
        .catch((e) => {
            res.redirect("/admin/articles");
        });
});

// Delete article
router.post("/admin/articles/delete", (req, res) => {
    var id = req.body.id;
    if (id != undefined) {
        if (!isNaN(id)) {
            Article.destroy({
                where: { id: id },
            }).then(() => {
                res.redirect("/admin/articles");
            });
        } else {
            res.redirect("/admin/articles");
        }
    } else {
        res.redirect("/admin/articles");
    }
});
