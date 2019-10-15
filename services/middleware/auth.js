const httpStatus = require("http-status");

module.exports = passport => {
    return {
        isLogined(req, res, next) {
            if (typeof req.user === "undefined") {
                res.status(httpStatus.UNAUTHORIZED).end();
            }
            res.status(httpStatus.OK);
            next();
        },

        isAdmin(req, res, next) {
            const { user } = req;
            const isLogin = typeof user !== "undefined";
            if (isLogin) {
                const { is_admin } = user;
                const isAdmin = is_admin === 1;
                if (isAdmin) {
                    next();
                    return;
                }
                res.statusCode = httpStatus.UNAUTHORIZED;
                throw new Error("NOT ADMIN");
            }

            res.status(httpStatus.NOT_FOUND).redirect("/404");
        },

        clearAuth(req, res) {
            req.logout();
            res.send(true);
        },

        authenticate(req, res, next) {
            /*
            , function(err, user, info) {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.status(httpStatus.UNAUTHORIZED).json(false);
                }
                req.logIn(user, function(err) {
                    if (err) {
                        return next(err);
                    }
                    return res.status(httpStatus.OK).json(true);
                });
                return res.status(httpStatus.UNAUTHORIZED).json(false);
            }
            */
            // return res.status(httpStatus.OK).json(true);
            passport.authenticate("local")(req, res, next);
        }
    };
};
