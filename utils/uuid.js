const uuid4 = require("uuid4");

const generateUUID = () => {
    const tokens = uuid4().split("-");
    return tokens.reduce((acc, cur) => {
        acc = acc + cur;
        return acc;
    }, "");
};

module.exports = { generateUUID };
