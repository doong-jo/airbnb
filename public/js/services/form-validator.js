import _ from "./constants.js";
import { getOriginUrl } from "../utils/light-dom.js";
import { requestServer } from "../utils/light-api.js";

/**
 * 각 유효성 검사 실시하고 결과 값을 반환합니다.
 *
 * @param {array} cases 유효성 검사 함수들의 배열
 * @returns {object} 성공 여부(result)와 실패했다면 case 번호(failCase) => { result, failCase }
 */
async function getFailCase(cases) {
    let result = false;
    let failData = {};
    let caseInd = 0;
    while (cases[caseInd]) {
        result = await cases[caseInd]();
        failData = { result, failCase: caseInd };

        if (!result) {
            break;
        }
        caseInd += 1;
    }

    return failData;
}

const FormValidator = {
    /**
     * 유효한 날짜인지 검사합니다. Date 객체로 생성 가능하고, 일자가 해당 월에 존재하는 일인지 판별합니다.
     *
     * @param {string} y 연도
     * @param {string} m 월
     * @param {string} d 일
     * @returns {boolean} 유효 여부
     */
    validateDate(y, m, d) {
        return new Date(`${+y}-${+m}-${+d}`).getDate() === +d;
    },

    /**
     * 유효한 아이디인지 검사합니다.
     * 5 ~ 20, 영 소문자, 숫자, 특수기호 '['_', '-']' 를 판별합니다.
     *
     * @param {string} value 아이디 값
     * @returns {object} 유효 여부
     */
    checkId(value) {
        const cases = [() => /(^[a-z0-9_-]{5,20})$/.test(value)];

        return getFailCase(cases);
    },

    /**
     * 유효한 아이디인지 검사하고 존재하는 아이디인지도 함께 검사합니다.
     *
     * @param {string} value 아이디 값
     * @returns {object} 유효 여부
     */
    async checkIdAndExists(value) {
        const cases = [
            () => /(^[a-z0-9_-]{5,20})$/.test(value),
            async () => {
                return !(await requestServer(
                    _.METHOD.GET,
                    { id: value },
                    `${getOriginUrl()}${_.URL.EXIST}`
                ));
            }
        ];

        return getFailCase(cases);
    },

    /**
     * 유효한 비밀번호인지 검사합니다.
     * 8 ~ 16, 영 대소문자, 숫자, 특수기호 를 판별합니다.
     *
     * @param {string} value 비밀번호 값
     * @returns {boolean} 유효 여부
     */
    checkPw(value) {
        const cases = [
            () => /^(.{8,16})$/.test(value),
            () => /[A-Z]/.test(value),
            () => /[0-9]/.test(value),
            // eslint-disable-next-line no-useless-escape
            () => /[!@#$%^&*(\)\-_=+\[\]\{\}\\\|\`\~\/\?\,\.\<\>]/.test(value)
        ];

        return getFailCase(cases);
    },

    /**
     * 유효한 이름인지 검사합니다.
     * 2 ~ 20, 영 대소문자, 한글 를 판별합니다.
     *
     * @param {string} value 이름 값
     * @returns {boolean} 유효 여부
     */
    checkName(value) {
        const cases = [() => /(^[a-zA-Z가-힣]{2,20})$/.test(value)];

        return getFailCase(cases);
    },

    /**
     * 유효한 연도인지 검사합니다.
     * 4자리 양수 숫자 를 판별합니다.
     *
     * @param {string} value 연도 값
     * @returns {boolean} 유효 여부
     */
    checkYearOfBirth(value) {
        const age = new Date().getFullYear() - +value + 1;

        const cases = [
            () => /(^[0-9]{4})$/.test(`${+value}`),
            () => age >= 15,
            () => age <= 99
        ];

        return getFailCase(cases);
    },

    /**
     * 유효한 월인지 검사합니다.
     * 1 ~ 12 를 판별합니다.
     *
     * @param {string} value 해당 월 값
     * @returns {boolean} 유효 여부
     */
    checkMonthOfBirth(value) {
        const cases = [
            () =>
                /(^[0-9]{1,2})$/.test(`${value}`) && +value >= 1 && +value <= 12
        ];

        return getFailCase(cases);
    },

    /**
     * 유효한 일자인지 검사합니다.
     * 1 ~ 31 를 판별합니다.
     *
     * @param {string} value
     * @returns {boolean} 유효 여부
     */
    checkDateOfBirth(value) {
        const cases = [
            () =>
                /(^[0-9]{1,2})$/.test(`${value}`) && +value >= 1 && +value <= 31
        ];

        return getFailCase(cases);
    },

    /**
     * 유효한 성별인지 검사합니다.
     * '성별'은 불가, '남', '여' 만 가능합니다.
     *
     * @param {string} value
     * @returns {boolean} 유효 여부
     */
    checkSex(value) {
        const cases = [
            () => value !== "성별" && (value === "남" || value === "여")
        ];

        return getFailCase(cases);
    },

    /**
     * 유효한 이메일인지 검사합니다.
     * xxx@xxx.xxx 형식을 판별합니다.
     *
     * @param {string} value
     * @returns {boolean} 유효 여부
     */
    checkEmail(value) {
        const cases = [() => /(^[a-zA-Z0-9]+)@([a-z]+)\.([a-z]+$)/.test(value)];

        return getFailCase(cases);
    },

    /**
     * 유효한 휴대전화번호인지 검사합니다.
     * 앞 3자리 010, 10자리 또는 11자리 를 판별합니다.
     *
     * @param {string} value
     * @returns {boolean} 유효 여부
     */
    checkMobile(value) {
        const cases = [() => /([0][1][0])+(([0-9]){7,8})$/.test(value)];

        return getFailCase(cases);
    },

    /**
     * validation 결과를 보여준다
     * 유효성 검사 -> css 교체 -> 문장 교체
     *
     * @param {object} args form 각 항목에 부여되는 객체
     * @param {*} value 각 항목의 값
     * @returns {boolean} 검사 결과
     */
    async showValidation(args, value) {
        const {
            validator,
            spanValidator,
            denySentence,
            successSentence
        } = args;
        const classes = spanValidator.classList;

        const { result, failCase } = await validator(value);

        const addClass = result ? "okay" : "warning";
        const rmClass = result ? "warning" : "okay";

        if (value === "") {
            classes.remove("okay");
            classes.remove("warning");
            return false;
        }

        if (!classes.contains(addClass)) {
            classes.remove(rmClass);
            // restart animation, https://bit.ly/2UkQglI
            // eslint-disable-next-line no-void
            void spanValidator.offsetWidth;
            classes.add(addClass);
        }

        const caseInd =
            denySentence.length <= failCase
                ? denySentence.length - 1
                : failCase;

        let selectedDenySentence = denySentence[caseInd];

        spanValidator.innerHTML = result
            ? successSentence
            : selectedDenySentence;

        return result;
    }
};

export default FormValidator;
