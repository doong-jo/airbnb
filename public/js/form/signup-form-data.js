/* eslint-disable import/extensions */
import FormValidator from "../services/form-validator.js";
import { makeNumberArray } from "../utils/util.js";

const signupFormData = target => [
    {
        type: "label",
        for: "f_id",
        innerHTML: "아이디"
    },
    {
        type: "input",
        inputType: "text",
        nameAndId: "f_id",
        nick: "아이디",
        maxLength: 20,
        placeholder: "5~20자, 영 소문자, 숫자, (_, -)만 사용 가능",
        validator: FormValidator.checkIdAndExists,
        denySentence: [
            "5~20자의 영문 소문자, 숫자와 특수기호(_)(-) 만 사용 가능합니다.",
            "이미 사용중인 아이디입니다"
        ],
        successSentence: "사용 가능한 아이디입니다."
    },
    {
        type: "label",
        for: "f_pw",
        innerHTML: "비밀번호"
    },
    {
        type: "input",
        inputType: "password",
        nameAndId: "f_pw",
        nick: "비밀번호",
        maxLength: 16,
        placeholder: "8~16자, 영 대소문자, 숫자, 특수문자의 조합",
        validator: FormValidator.checkPw,
        denySentence: [
            "8자 이상 16자 이하로 입력해주세요.",
            "영문 대문자를 최소 1자 이상 포함해주세요.",
            "숫자를 최소 1자 이상 포함해주세요.",
            "특수문자를 최소 1자 이상 포함해주세요."
        ],
        successSentence: "안전한 비밀번호입니다."
    },
    {
        type: "label",
        for: "f_pw_confirm",
        innerHTML: "비밀번호 재확인"
    },
    {
        type: "input",
        inputType: "password",
        nameAndId: "f_pw_confirm",
        nick: "비밀번호 재확인",
        maxLength: 16,
        placeholder: "비밀번호를 한번 더 입력해주세요.",
        validator: target.checkConfirmPw,
        denySentence: ["비밀번호가 일치하지 않습니다."],
        successSentence: "비밀번호가 일치합니다."
    },
    {
        type: "label",
        for: "f_name",
        innerHTML: "이름"
    },
    {
        type: "input",
        inputType: "text",
        nameAndId: "f_name",
        nick: "이름",
        maxLength: 20,
        placeholder: "2~20자, 영 대소문자, 한글",
        validator: FormValidator.checkName,
        denySentence: ["이름이 올바르지 않습니다."],
        successSentence: "사용가능한 이름입니다."
    },
    {
        type: "label",
        for: "f_birth_year",
        innerHTML: "생년월일"
    },
    {
        type: "element-rows",
        validator: "children",
        elements: [
            {
                type: "input",
                inputType: "number",
                nameAndId: "f_birth_year",
                nick: "출생연도",
                placeholder: "년(4자)",
                validator: FormValidator.checkYearOfBirth,
                denySentence: [
                    "태어난 년도 4자리를 정확하게 입력하세요.",
                    "만 14세 이상만 가입 가능합니다.",
                    "태어난 날짜를 다시 확인해주세요."
                ],
                successSentence: "&nbsp;"
            },
            {
                type: "select",
                nameAndId: "f_birth_month",
                nick: "출생월",
                values: makeNumberArray(1, 12, "월"),
                selectedInd: 0,
                validator: FormValidator.checkMonthOfBirth,
                denySentence: ["출생월을 선택해주세요."],
                successSentence: "&nbsp;"
            },
            {
                type: "select",
                inputType: "number",
                nameAndId: "f_birth_day",
                nick: "출생일",
                values: ["일"],
                selectedInd: 0,
                validator: FormValidator.checkDateOfBirth,
                denySentence: ["출생일이 올바르지 않습니다."],
                successSentence: "&nbsp;"
            }
        ]
    },
    {
        type: "label",
        for: "f_sex",
        innerHTML: "성별"
    },
    {
        type: "select",
        nameAndId: "f_sex",
        nick: "성별",
        values: ["성별", "남", "여"],
        selectedInd: 0,
        validator: FormValidator.checkSex,
        denySentence: ["성별을 선택해주세요."],
        successSentence: "&nbsp;"
    },
    {
        type: "label",
        for: "f_email",
        innerHTML: "이메일"
    },
    {
        type: "input",
        inputType: "text",
        nameAndId: "f_email",
        nick: "이메일",
        placeholder: "xxx@xxx.xxx",
        validator: FormValidator.checkEmail,
        denySentence: ["이메일 주소를 다시 확인해주세요."],
        successSentence: "&nbsp;"
    },
    {
        type: "label",
        for: "f_phone",
        innerHTML: "휴대전화"
    },
    {
        type: "input",
        inputType: "tel",
        nameAndId: "f_phone",
        nick: "휴대전화",
        maxLength: 11,
        placeholder: "- 없이 입력해주세요. 예)01012345678",
        validator: FormValidator.checkMobile,
        denySentence: ["형식에 맞지 않는 번호입니다."],
        successSentence: "&nbsp;"
    },
    {
        type: "label",
        for: "f_favorite",
        innerHTML: "관심사"
    },
    {
        type: "tag-list",
        nameAndId: "f_favorite",
        minTag: target.MIN_FAVOR_NUM,
        nick: "관심사",
        validator: target.checkFavoriteTagList,
        denySentence: ["3개 이상의 관심사를 입력하세요."],
        successSentence: "&nbsp;"
    },
    {
        type: "checkboxWithText",
        inputType: "checkbox",
        checkboxPos: "right",
        text: "약관에 동의합니다",
        underlined: true,
        nameAndId: "f_agree",
        textOnClick: target.openTerm,
        textClassName: "label-checkbox",
        disabled: true,
        nick: "약관",
        validator: target.checkTerm,
        denySentence: ["약관에 동의하셔야만 가입이 가능합니다."],
        successSentence: "&nbsp;"
    },
    {
        type: "element-rows",
        elements: [
            {
                type: "button",
                attrType: "button",
                className: "primary",
                text: "초기화",
                doAction: target.askReset
            },
            {
                type: "button",
                attrType: "button",
                className: "primary",
                text: "가입하기",
                doAction: target.validateForm
            }
        ]
    }
];

export default signupFormData;
