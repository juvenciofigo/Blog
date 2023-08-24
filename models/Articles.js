const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("./Categories");

const Articles = connection.define("articles", {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
});

Category.hasMany(Articles);
Articles.belongsTo(Category);

// Articles.sync({ force: false });
module.exports = Articles;
