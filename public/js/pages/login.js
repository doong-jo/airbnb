import Page from "../pages/page.js";
import FormValidator from "../services/form-validator.js";
import _ from "../services/constants.js";
import NodeBuilder from "../utils/node-builder.js";
import { requestServer } from "../utils/light-api.js";
import { goToPage, $$, findChild, addClass } from "../utils/light-dom.js";
import loginView from "../../views/login-view.js";

const MESSAGES = {
    FAIL_LOGIN: "로그인에 실패했습니다.",
    WRONG_ID: "올바르지 않은 아이디입니다.",
    WRONG_PW: "올바르지 않은 비밀번호 입니다."
};

async function doLogin(id, pwd) {
    const loginResponse = await requestServer(
        _.METHOD.POST,
        { id, password: pwd },
        _.URL.LOGIN
    );

    if (loginResponse) {
        goToPage(_.PAGE_HASH.MAIN);
        return;
    }

    alert(MESSAGES.FAIL_LOGIN);
}

class Login extends Page {
    constructor() {
        super();
        this.view = loginView;
    }

    async build() {
        this.mainView = $$(".login");
        this.idInput = $$("#f_id");
        this.pwInput = $$("#f_pw");

        this.makeValidator();
        NodeBuilder.makeSpanValidator(
            this.pwValidator,
            findChild(this.mainView, ".validator")
        );

        NodeBuilder.makeSpanValidator(
            this.idValidator,
            findChild(this.mainView, ".validator")
        );

        this.setListeners();
    }

    setListeners() {
        const loginBtn = findChild(this.mainView, "#login");
        const signupBtn = findChild(this.mainView, "#signup");
        const bgVideo = findChild(this.mainView, ".bg-video");

        bgVideo.addEventListener("play", () => {
            setTimeout(() => {
                addClass(bgVideo, "adjust-size");
                // bgVideo.offsetWidth;
            }, 1000);
        });

        loginBtn.addEventListener(
            "click",
            this.validate(this.idValidator, this.pwValidator)
        );

        signupBtn.addEventListener("click", () => {
            goToPage(_.PAGE_HASH.SIGNUP);
        });
    }

    validate(idValidator, pwValidator) {
        return () => {
            const { 0: idInputVal, 1: pwInputVal } = [
                this.idInput.value,
                this.pwInput.value
            ];

            if (
                FormValidator.showValidation(idValidator, idInputVal) &&
                FormValidator.showValidation(pwValidator, pwInputVal)
            ) {
                doLogin(idInputVal, pwInputVal);
            }
        };
    }

    makeValidator() {
        this.idValidator = {
            validator: FormValidator.checkId,
            denySentence: [MESSAGES.WRONG_ID],
            successSentence: "&nbsp;"
        };

        this.pwValidator = {
            validator: FormValidator.checkPw,
            denySentence: [MESSAGES.WRONG_PW],
            successSentence: "&nbsp;"
        };
    }
}

export default Login;
