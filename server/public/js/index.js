import { Router } from "./router.js";
import { $$ } from "./utils/light-dom";
import Main from "./pages/main.js";
import Login from "./pages/login.js";
import Signup from "./pages/signup.js";

import "../styles/normarlize.css";
import "../styles/general.scss";
import "../styles/carousel.scss";
import "../styles/card.scss";
import "../styles/login.scss";
import "../styles/signup.scss";
import "../styles/form.scss";
import "../styles/tag.scss";
import "../styles/modal.scss";

const mainPage = new Main();

const router = new Router(
    {
        default: mainPage,
        main: mainPage,
        login: new Login(),
        signup: new Signup()
    },
    $$("#main")
);
