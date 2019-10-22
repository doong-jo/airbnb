import fs from "fs";
import path from "path";
import csv from "csv-parser";
import db from "../models/db";

async function createTable(model) {
    return await model.sync();
}

async function clearTable(model) {
    return await model.truncate({
        cascade: true
    });
}

async function createDummyData(model) {
    const { name } = model;
    const processByExt = {
        json: () => {
            return require(`./dummy/${name}.json`);
        },
        csv: () => {
            const csvData = [];
            return new Promise((res, rej) => {
                const csvFile = path.join(__dirname, `./dummy/${name}.csv`);
                fs.createReadStream(csvFile)
                    .pipe(csv())
                    .on("data", function(data) {
                        csvData.push(data);
                    })
                    .on("end", function() {
                        res(csvData);
                    });
            });
        }
    };

    const dummyData = await processByExt[model.insertDataType]();
    const createResult = await model.bulkCreate(dummyData, { logging: false });
    return {
        recordLength: dummyData.length,
        createResult
    };
}

async function initDatabaseSync() {
    const { sequelize } = db;
    const { user, house, reservation } = db;

    console.log("DATABASE INITIALIZING..........");

    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0", null, {});
    // 순서를 지켜야 함
    await createTable(user);
    await createTable(house);
    await createTable(reservation);
    await clearTable(reservation);
    await clearTable(user);
    await clearTable(house);
    await createDummyData(user);
    await createDummyData(house);
    await createDummyData(reservation);
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1", null, {});

    console.log("--- DEVELOPMENT MODE DATABASE INITIALIZE FINISH ---");
}

module.exports = {
    createTable,
    clearTable,
    createDummyData,
    initDatabaseSync
};
