require("dotenv").config();
const express = require("express");
const path = require("path");
const logger = require("morgan");

const app = express();

const notFoundHandler = require("./services/handler/notfound-handler");
const serverInternalHandler = require("./services/handler/serverinternal-handler");
const mainRouter = require("./routes/index");

const _ = require("./services/constants");

const PORT = 80;
const STATIC_PATH = express.static(path.join(__dirname, "public"));
const HTML_FILE = path.join(__dirname, "public/index.html");

const { NODE_ENV, ENV_DEV, ENV_PROD } = process.env;
process.env.NODE_ENV = NODE_ENV || ENV_DEV;

if (process.env.NODE_ENV === ENV_DEV) {
    console.log("--- DEVELOPMENT MODE ---");
    const { initDatabaseSync } = require("./sql/init-database");
    (async function() {
        console.log("--- DEVELOPMENT MODE DATABASE INITIALIZE ---");
        await initDatabaseSync();
    })();
    app.use(logger("dev"));
} else if (process.env.NODE_ENV === ENV_PROD) {
    console.log("--- PRODUCTION MODE ---");
}

const passport = require("./services/passport")(app);

app.use(express.json());
app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(STATIC_PATH);
app.get("/", (req, res) => {
    res.sendFile(HTML_FILE);
});
app.use("/", mainRouter(passport));
app.use(notFoundHandler);
app.use(serverInternalHandler);

app.listen(process.env.PORT || PORT, () => {
    console.log(`Listening ${PORT}...`);
});

module.exports = { app, passport };
