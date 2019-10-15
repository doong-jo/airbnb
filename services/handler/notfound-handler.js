const path = require("path");
const httpStatus = require("http-status");

module.exports = (req, res, next) => {
    if (res.statusCode === httpStatus.NOT_FOUND) {
        res.sendFile(path.join(__dirname, "notfound.html"));
        return;
    }

    next();
};
