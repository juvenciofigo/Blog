const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const Category = require("../models/Categories");
const Article = require("../models/Articles");

// User routes

// Show all articles

router.get("/articles/page/:num?", (req, res) => {
    const page = Math.ceil(Number(req.params.num));
    var offset = 0;
    const limit = 2;
    console.log(page);

    if (isNaN(page)) {
        res.redirect("/");
    } else if (page <= 1) {
        offset = 0;
    } else {
        offset = (page - 1) * limit;
    }

    Article.findAndCountAll({
        limit: limit,
        offset: offset,
        order: [["id", "DESC"]],
    })
        .then((articles) => {
            const totalPages = Math.ceil(articles.count / limit);
            const next = totalPages > page;

            const result = {
                next: next,
                articles: articles,
                page: page,
            };

            Category.findAll().then((categories) => {
                res.render("./pages/articles", { result: result, categories: categories, headTitle: "Artigos", totalPages: totalPages });
            });
        })
        .catch((err) => {
            res.redirect("/");
        });
});

// Show one article
router.get("/articles/:slug", (req, res) => {
    const slug = req.params.slug;

    Article.findOne({ where: { slug: slug } })
        .then((article) => {
            if (article != undefined) {
                Category.findAll().then((categories) => {
                    res.render("./pages/showArticle", { article: article, categories: categories, headTitle: "Artigo" });
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
            res.render("./pages/admin/articles/articles", { article: article, headTitle: "Artigos" });
        })
        .catch((error) => {
            console.log(error);
        });
});
// Create new article
router.get("/admin/articles/new", (req, res) => {
    Category.findAll().then((categories) => {
        res.render("./pages/admin/articles/newArticles", { categories: categories, headTitle: "Novo artigo" });
    });
});
// Save new article
router.post("/articles/save", (req, res) => {
    const title = req.body.title;
    const body = req.body.body;
    const category = req.body.category;

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
    const id = req.params.id;
    if (id !== undefined) {
        Article.findByPk(id)
            .then((article) => {
                Category.findAll().then((categories) => {
                    res.render("./pages/admin/articles/editArticle", { article: article, categories: categories, headTitle: "Editar artigo" });
                });
            })
            .catch((error) => {
                res.redirect("/admin/articles");
            });
    } else {
        res.redirect("");
    }
});

//update article
router.post("/articles/update", (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const body = req.body.body;
    const category = req.body.category;

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
    const id = req.body.id;
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
