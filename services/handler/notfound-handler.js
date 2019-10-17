const path = require("path");
const httpStatus = require("http-status");

export default function(req, res, next) {
    if (res.statusCode === httpStatus.NOT_FOUND) {
        res.sendFile(path.join(__dirname, "notfound.html"));
        return;
    }

    next();
}
