const fs = require("fs");
const path = require("path");
const modelNameList = getModelNames();

function getModelNames() {
    const basename = path.basename(__filename);
    const nameList = [];

    fs.readdirSync(__dirname)
        .filter(file => file.indexOf(".") !== 0 && file !== basename)
        .forEach(file => {
            const modelName = file.split(".js")[0];
            nameList.push(modelName);
        });

    return nameList;
}

async function createTable(model) {
    return await model.sync();
}

async function clearTable(model) {
    return await model.destroy({
        where: {},
        truncate: true
    });
}

async function createDummyData(modelName, model, ext) {
    const processByExt = {
        json: () => {
            return require(`./dummy/${modelName}.${ext}`);
        },
        csv: () => {
            const csv = require("csv-parser");
            const csvData = [];
            return new Promise((res, rej) => {
                const csvFile = path.join(
                    __dirname,
                    `./dummy/${modelName}.${ext}`
                );
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

    const dummyData = await processByExt[ext]();
    const createResult = await model.bulkCreate(dummyData, { logging: false });
    return {
        recordLength: dummyData.length,
        createResult
    };
}

async function initDatabaseSync() {
    function getTablePromiseArray(modelName) {
        return [
            createTable(modelName),
            clearTable(modelName),
            createDummyData(modelName)
        ];
    }

    function getPromiseList() {
        let promiseList = [];
        modelNameList.forEach(name => {
            allTablePromises = allTablePromises.concat(
                getTablePromiseArray(name)
            );
        });
        return promiseList;
    }

    const tablePromises = getPromiseList();
    await Promise.all(tablePromises);
}

module.exports = {
    createTable,
    clearTable,
    createDummyData,
    initDatabaseSync
};
