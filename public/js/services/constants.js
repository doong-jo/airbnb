const Constants = {
    HOST: `http://${document.location.hostname}`,

    METHOD: {
        GET: "GET",
        POST: "POST",
        PUT: "PUT"
    },

    HEADER_TYPE_JSON: { "Content-Type": "application/json" },

    URL: {
        LOGIN: "/auth/login",
        AUTH: "/auth/passport",
        LOGOUT: "/auth/logout",
        SIGNUP: "/user/signup",
        EXIST: "/user/exists",
        MINI_CAROUSEL: "/carousel/mini-carousel",
        MAIN_CAROUSEL: "/carousel/main-carousel",
        CARD: "/carousel/card"
    },

    PAGE_HASH: {
        LOGIN: "./#login",
        SIGNUP: "./#signup",
        MAIN: "./#main"
    }
};

export default Constants;
