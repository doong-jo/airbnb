const fs = require("fs");
const util = require("util");
const path = require("path");
const readFile = util.promisify(fs.readFile);

const { getItemTemplate } = require("../../ssr-admin/item-template");
const { getUserTemplate } = require("../../ssr-admin/user-template");

const buildPageTemplate = {
    user: getUserTemplate,
    item: getItemTemplate
};

async function readRawDataByPageName(name) {
    const ssrPath = path.join(__dirname, "../../ssr-admin");
    const scriptFilePath = path.join(ssrPath, `js/${name}.js`);
    const styleFilePath = path.join(ssrPath, `css/${name}.css`);

    const scriptRaw = (await readFile(scriptFilePath, {
        encoding: "utf8"
    })).toString();
    const styleRaw = (await readFile(styleFilePath, {
        encoding: "utf8"
    })).toString();

    return { scriptRaw, styleRaw };
}

async function getPage(name) {
    const { scriptRaw, styleRaw } = await readRawDataByPageName(name);

    return buildPageTemplate[name](scriptRaw, styleRaw);
}

async function serveRawData(req, res) {
    const path = req.path.split("/")[1];
    let pageName = path === "" ? "item" : path;
    const page = await getPage(pageName);

    res.send(page);
}

module.exports = {
    serveRawData
};
