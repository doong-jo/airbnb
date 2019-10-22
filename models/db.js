import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config();

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
            logging: false,
            timezone: "+09:00",
            define: {
                charset: "utf8mb4",
                dialectOptions: {
                    collate: "utf8mb4_general_ci"
                }
            }
        }
    );

    return sequelize;
}

function getDatabaseModel() {
    const sequelize = getSequelizeInstance();
    const db = getImportedAllModels(sequelize);
    db["sequelize"] = sequelize;
    db.errorHandler = err => {
        console.error(err.sql);
        throw new Error(err.sql);
    };

    return db;
}

const db = getDatabaseModel();
module.exports = db;
