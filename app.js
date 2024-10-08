const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const favicon = require("serve-favicon");
const path = require("path");
const session = require("express-session");

// session
app.use(
    session({
        secret: "qualquercoisamesmo",
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 3000000 },
    })
);

//Routes
const homePage = require("./routes/index");
const categoriesRoutes = require("./routes/categories");
const articlesRoutes = require("./routes/articles");
const users = require("./routes/users");
const connection = require("./database/database");

// view engine setup
app.set("view engine", "ejs");

// static
app.use(express.static("public"));
app.use(favicon(path.join(__dirname, "public", "image", "faviconjvc.ico")));

//Body parser
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

//Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!");
    })
    .catch((error) => {
        console.log(error);
    });

app.use("/", homePage);
app.use("/", categoriesRoutes);
app.use("/", articlesRoutes);
app.use("/", users);

app.listen(8080, () => console.log(" listening on"));
