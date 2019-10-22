import path from "path";
import status from "http-status";

export default function(req, res, next) {
    if (res.statusCode === status.NOT_FOUND) {
        res.sendFile(path.join(__dirname, "notfound.html"));
        return;
    }

    next();
}
