const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const Category = require("../models/Categories");
const Article = require("../models/Articles");
const adminAuth = require("../middleware/adminAuth");


router.get("/categorias", function (req, res) {
    Article.findAll().then((article) => {
        Category.findAll().then((categories) => {
            res.render("./pages/categories", { articles: article, categories: categories, headTitle: "Categorias" });
        });
    });
});
router.get("/categoria/:slug", function (req, res) {
    var slug = req.params.slug;

    Category.findOne({ where: { slug: slug }, include: [{ model: Article }] }).then((catSlug) => {
        Article.findAll().then(() => {
            Category.findAll().then((categories) => {
                res.render("./pages/categoriesSlug", { categories: categories, catSlug: catSlug, articles: catSlug.articles, headTitle: "Categorias" });
            });
        });
    });
});
//

//                       Admin routes

// Create a new Category
router.get("/admin/categories/new", adminAuth, (req, res) => {
    res.render("./pages/admin/categories/newCategories", { headTitle: "Nova categoria" });
});

// Edit categories
router.get("/admin/categories/edit/:id",adminAuth, (req, res) => {
    var id = req.params.id;
    console.log(id);
    if (isNaN(id)) {
        res.redirect("/admin/categories");
    }
    Category.findByPk(id)
        .then((category) => {
            if (category != undefined) {
                res.render("./pages/admin/categories/editCategories", { category: category, headTitle: "Categoria" });
            } else {
                res.redirect("/admin/categories");
            }
        })
        .catch((error) => {
            res.redirect("/admin/categories");
        });
});
// Show categories
router.get("/admin/categories",adminAuth, (req, res) => {
    Category.findAll({ order: [["id", "DESC"]] }).then((categories) => {
        res.render("./pages/admin/categories/categories", {
            categories: categories,
            headTitle: "Categoria",
        });
    });
});
// Delete categories
router.post("/admin/categories/delete",adminAuth, (req, res) => {
    var id = req.body.id;
    if (id != undefined) {
        if (!isNaN(id)) {
            Category.destroy({
                where: { id: id },
            }).then(() => {
                res.redirect("/admin/categories");
            });
        } else {
            res.redirect("/admin/categories");
        }
    } else {
        res.redirect("/admin/categories");
    }
});
// Update category
router.post("/admin/categories/update",adminAuth, (req, res) => {
    var id = req.body.id;
    var title = req.body.title;

    Category.update({ title: title, slug: slugify(title) }, { where: { id: id } }).then(() => {
        res.redirect("/admin/categories");
    });
});
// Save New Category
router.post("/categories/save",adminAuth, (req, res) => {
    var title = req.body.title;
    if (title != undefined) {
        Category.create({
            title: title,
            slug: slugify(title),
        }).then(() => {
            res.redirect("/admin/categories/new");
        });
    } else {
        res.redirect("/admin/categories");
    }
});

module.exports = router;
