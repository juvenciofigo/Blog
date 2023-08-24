const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//Routes
const homePage = require("./routes/index");
const categoriesRoutes = require("./routes/categories");
const categoriesRoutes = require("./routes/categories");
const users = require("./routes/users");
const connection = require("./database/database");
// view engine setup
app.set("view engine", "ejs");
// static
app.use(express.static("public"));

//Body parser
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

//Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!");
    })
    .catch((error) => {
        console.log(error) ;
    });



app.use("/", homePage);
app.use("/", categoriesRoutes);
app.use("/", articlesRoutes);
app.use("/", users);
app.listen(8080, () => console.log(" listening on"));
