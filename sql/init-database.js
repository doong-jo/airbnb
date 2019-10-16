import fs from "fs";
import path from "path";
import csv from "csv-parser";
import db from "../models/db";

async function createTable(model) {
    return await model.sync();
}

async function clearTable(model) {
    return await model.destroy({
        where: {},
        truncate: true
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
    function getTablePromiseArray(model) {
        return [createTable(model), clearTable(model), createDummyData(model)];
    }

    function getPromiseList() {
        let processList = [];
        for (const [name, model] of Object.entries(db)) {
            if (name !== "sequelize") {
                processList = processList.concat(getTablePromiseArray(model));
            }
        }

        return processList;
    }

    const tablePromises = getPromiseList();
    const resultArr = await Promise.all(tablePromises);
    return resultArr;
}

module.exports = {
    createTable,
    clearTable,
    createDummyData,
    initDatabaseSync
};
