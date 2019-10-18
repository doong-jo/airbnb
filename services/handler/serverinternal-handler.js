import status from "http-status";

export default function(req, res, next) {
    if (res.statusCode === status.INTERNAL_SERVER_ERROR) {
        res.locals.message = err.message;
        res.locals.error = req.app.get("env") === "development" ? err : {};

        res.status(err.status || 500);
        res.render("error");
    }

    next();
}
