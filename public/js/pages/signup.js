import Page from "./page.js";
import Form from "../components/form.js";
import Modal from "../components/modal.js";

import modalTermView from "../../views/modal/modal-term-view.js";
import modalResetView from "../../views/modal/modal-reset-view.js";
import modalDenySignupView from "../../views/modal/modal-deny-signup-view.js";
import signupFormData from "../form/signup-form-data.js";

import signupView from "../../views/signup-view.js";
import FormValidator from "../services/form-validator.js";
import { requestServer } from "../utils/light-api.js";
import { $$, findChild, goToPage } from "../utils/light-dom.js";
import { debounce, makeNumberArray } from "../utils/util.js";
import NodeBuilder from "../utils/node-builder.js";
import _ from "../services/constants.js";

class Signup extends Page {
    constructor() {
        super();

        this.MIN_FAVOR_NUM = 3;
        this.termRead = false;
        this.view = signupView;
    }

    async build() {
        this.makeListeners();
        this.makeValidator();

        this.signupPage = $$(".signup");
        this.signupForm = this.buildSignupForm();
        this.termModal = this.buildTermModal();
        this.resetModal = this.buildResetModal();
        this.signupDenyModal = this.buildSignupDenyModal();

        this.makeElementVariables();

        this.registerEvents();
    }

    makeElementVariables() {
        this.signupFormContainer = this.signupForm.container;

        this.idInput = findChild(this.signupFormContainer, "#f_id");
        this.pwInput = findChild(this.signupFormContainer, "#f_pw");
        this.pwConfirmInput = findChild(
            this.signupFormContainer,
            "#f_pw_confirm"
        );
        this.yearOfBirth = findChild(this.signupFormContainer, "#f_birth_year");
        this.monthOfBirth = findChild(
            this.signupFormContainer,
            "#f_birth_month"
        );
        this.dayOfBirth = findChild(this.signupFormContainer, "#f_birth_day");
        this.termChkbox = findChild(this.signupFormContainer, "#f_agree");
        this.denySpan = findChild(
            this.signupDenyModal.container,
            ".deny-signup-sentence"
        );
        this.agreeBtn = findChild(this.termModal.container, ".agree");
        this.termTextArea = findChild(this.termModal.container, "textarea");
    }

    makeListeners() {
        this.checkScroll = debounce(e => {
            const { scrollHeight, scrollTop, offsetHeight } = e.target;

            if (scrollHeight <= scrollTop + offsetHeight) {
                this.agreeBtn.disabled = false;
                this.termRead = true;
            }
        }, 100);

        this.checkConfirmPw = () => ({
            result: this.pwInput.value === this.pwConfirmInput.value,
            failCase: 0
        });

        this.checkMonthOfBirth = () => {
            for (let day = 32; day >= 28; day -= 1) {
                if (
                    FormValidator.validateDate(
                        this.yearOfBirth.value,
                        this.monthOfBirth.value,
                        day
                    )
                ) {
                    const days = makeNumberArray(1, day, "일");
                    NodeBuilder.makeOptionsOfSelect(this.dayOfBirth, days);
                    break;
                }
            }
        };

        this.agreeTerm = () => {
            if (this.termRead) {
                this.termModal.toggle(false);
                this.termChkbox.checked = true;
            }
        };

        this.openTerm = () => {
            this.termModal.toggle(true);
        };

        this.hideTerm = () => {
            this.termModal.toggle(false);
        };

        this.askReset = () => {
            this.resetModal.toggle(true);
        };

        this.resetForm = () => {
            this.resetModal.toggle(false);
            this.signupForm.reset();
            this.termRead = false;
            this.termTextArea.scrollTop = 0;
            this.agreeBtn.disabled = true;
        };

        this.validateForm = async () => {
            const denyStr = await this.signupForm.getValidateResult();

            if (denyStr === "success") {
                const { 0: id, 1: pwd } = [
                    this.idInput.value,
                    this.pwInput.value
                ];
                this.doSignup(id, pwd);
                return;
            }

            this.signupDenyModal.toggle(true);
            this.denySpan.innerHTML = denyStr;
        };
    }

    async doSignup(id, pwd) {
        const response = await this.signupForm.submit(_.URL.SIGNUP);
        if (response) {
            await requestServer(_.METHOD.POST, { id, pwd }, _.URL.LOGIN);
            goToPage(_.PAGE_HASH.MAIN);

            return;
        }
        alert("가입에 실패했습니다.");
    }

    makeValidator() {
        this.checkFavoriteTagList = tags => {
            const result = tags.length >= this.MIN_FAVOR_NUM;
            return { result, failCase: 0 };
        };

        this.checkTerm = checked => ({ result: checked, failCase: 0 });
    }

    registerEvents() {
        this.termTextArea.addEventListener("scroll", this.checkScroll);
        this.monthOfBirth.addEventListener("change", this.checkMonthOfBirth);
    }

    buildSignupForm() {
        const formComp = new Form("signup-form");
        return formComp.build(signupFormData(this));
    }

    buildTermModal() {
        const { title, content } = modalTermView;
        const termModal = new Modal(this.signupPage, "term");
        const options = {
            width: "40rem",
            height: "30rem",
            title,
            content,
            footer: {
                confirmBtn: {
                    attrType: "button",
                    text: "동의",
                    className: "agree",
                    disabled: true,
                    doAction: this.agreeTerm
                }
            }
        };
        return termModal.makeModal(options);
    }

    buildResetModal() {
        const { title, content } = modalResetView;
        const resetModal = new Modal(this.signupPage, "reset");
        const options = {
            width: "30rem",
            title,
            content,
            footer: {
                confirmBtn: {
                    attrType: "button",
                    text: "확인",
                    doAction: this.resetForm
                },
                cancleBtn: {
                    attrType: "button",
                    text: "취소"
                }
            }
        };
        return resetModal.makeModal(options);
    }

    buildSignupDenyModal() {
        const { title, content } = modalDenySignupView;
        const signupDenyModal = new Modal(this.signupPage, "deny-signup");
        const options = {
            width: "30rem",
            title,
            content,
            footer: {
                cancleBtn: {
                    attrType: "button",
                    text: "확인"
                }
            }
        };
        return signupDenyModal.makeModal(options);
    }

    disableAllCSS() {
        this.includedCSS.forEach(cssName => {
            NodeBuilder.disalbeCSS(cssName);
        });
    }
}

export default Signup;
