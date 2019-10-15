const fs = require("fs");
const path = require("path");

function getImportedAllModels(sequelize) {
    const basename = path.basename(__filename);
    const db = {};

    fs.readdirSync(__dirname)
        .filter(file => file.indexOf(".") !== 0 && file !== basename)
        .forEach(file => {
            const model = sequelize["import"](path.join(__dirname, file));
            db[model.name] = model;
        });

    Object.keys(db).forEach(modelName => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });

    return db;
}

function getSequelizeInstance() {
    require("dotenv").config();
    const Sequelize = require("sequelize");
    const dbName = (() => {
        const { NODE_ENV } = process.env;
        if (NODE_ENV === process.env.ENV_DEV) {
            console.log("--- STARTING CONNECT TO DEV DATABASE ---");
            return process.env.DEV_DB_NAME;
        } else if (NODE_ENV === process.env.ENV_PROD) {
            console.log("--- STARTING CONNECT TO PRODUCTION DATABASE ---");
            return process.env.DB_NAME;
        }
    })();
    const sequelize = new Sequelize(
        dbName,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            dialect: "mysql",
            logging: false
        }
    );

    return sequelize;
}

function getDatabaseModel() {
    const sequelize = getSequelizeInstance();
    const db = getImportedAllModels(sequelize);

    return db;
}

const db = getDatabaseModel();
module.exports = db;
