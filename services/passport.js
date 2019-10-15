module.exports = app => {
    const bcrypt = require("bcrypt");
    const LocalStrategy = require("passport-local").Strategy;
    const passport = require("passport");
    const userModel = require("../models/user");

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done) {
        console.log("세션에 기록하기");
        done(null, user);
    });

    passport.deserializeUser(async function(user, done) {
        console.log("세션에서 사용자 정보 읽기");
        // const user = await userRepo.findById(id);
        done(null, user);
    });

    passport.use(
        new LocalStrategy(
            {
                usernameField: "id",
                passwordField: "password"
            },
            async function(username, password, done) {
                console.log("username", username);
                console.log("password", password);

                const user = await userModel.findById(username);
                console.log("responseUser", user);

                if (user.length === 0) {
                    return (
                        null,
                        false,
                        {
                            message: "Unknown user"
                        }
                    );
                }
                const responseUser = user[0];
                console.log("responseUser", responseUser);

                const isCorrect = await bcrypt.compare(
                    password,
                    responseUser.salt + responseUser.password
                );

                console.log("isCorrect", isCorrect);

                if (username === responseUser.id && isCorrect) {
                    return done(null, responseUser);
                } else {
                    return (
                        null,
                        false,
                        {
                            message: "Incorrect"
                        }
                    );
                }
            }
        )
    );

    return passport;
};
