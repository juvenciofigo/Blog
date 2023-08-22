const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const Category = require("../models/Categories");
const Article = require("../models/Articles");

router.get("/categorias", function (req, res) {
    Article.findAll().then((article) => {
        Category.findAll().then((categories) => {
            res.render("./pages/categories", { articles: article, categories: categories });
        });
    });
});
router.get("/categoria/:slug", function (req, res) {
    var slug = req.params.slug;

    Category.findOne({ where: { slug: slug }, include: [{ model: Article }] }).then((catSlug) => {
        Article.findAll().then(() => {
            Category.findAll().then((categories) => {
                res.render("./pages/categoriesSlug", {categories: categories, catSlug: catSlug, articles: catSlug.articles});
            });
        });
    });
});
//

//                       Admin routes

// Create a new Category
router.get("/admin/categories/new", (req, res) => {
    res.render("./pages/admin/categories/newCategories");
});

// Edit categories
router.get("/admin/categories/edit/:id", (req, res) => {
    var id = req.params.id;
    console.log(id);
    if (isNaN(id)) {
        res.redirect("/admin/categories");
    }
    Category.findByPk(id)
        .then((category) => {
            if (category != undefined) {
                res.render("./pages/admin/categories/editCategories", { category: category });
            } else {
                res.redirect("/admin/categories");
            }
        })
        .catch((error) => {
            res.redirect("/admin/categories");
        });
});
// Show categories
router.get("/admin/categories", (req, res) => {
    Category.findAll({ order: [["id", "DESC"]] }).then((categories) => {
        res.render("./pages/admin/categories/categories", {
            categories: categories,
        });
    });
});
// Delete categories
router.post("/admin/categories/delete", (req, res) => {
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
router.post("/admin/categories/update", (req, res) => {
    var id = req.body.id;
    var title = req.body.title;

    Category.update({ title: title, slug: slugify(title) }, { where: { id: id } }).then(() => {
        res.redirect("/admin/categories");
    });
});
// Save New Category
router.post("/categories/save", (req, res) => {
    var title = req.body.title;
    if (title != undefined) {
        Category.create({
            title: title,
            slug: slugify(title),
        }).then(() => {
            res.redirect("/admin/categories");
        });
    } else {
        res.redirect("/admin/categories");
    }
});

module.exports = router;