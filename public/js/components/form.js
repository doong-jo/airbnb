import Component from "./component.js";
import NodeBuilder from "../utils/node-builder.js";
import { requestServer } from "../utils/light-api.js";
import { debounce } from "../utils/util.js";
import FormValidator from "../services/form-validator.js";

import TagList from "./taglist.js";

/**
 * Select, Input 값 변경이 이루어지는 이벤트를 담당
 *
 * @param {object} args 각 항목의 정보
 * @returns {function} debounce가 적용된 listener
 */
function valueChangeListener(args) {
    return debounce(e => {
        const { value } = e.target;
        const { inputType, maxLength } = args;

        if (inputType === "number" || inputType === "tel") {
            e.target.value = value.slice(0, maxLength);
        }

        FormValidator.showValidation(args, value);
    }, 500);
}

/**
 * Input과 Select 항목에 listener를 추가한다.
 *
 * @param {Element} elem 대상이 되는 Element
 * @param {object} args 각 항목의 정보
 */
function addEventInputAndSelect(elem, args) {
    const { tagName } = elem;

    if (tagName === "INPUT") {
        elem.addEventListener("input", valueChangeListener(args));
    } else if (tagName === "SELECT") {
        elem.addEventListener("change", valueChangeListener(args));
    }
}

/**
 * 태그 리스트에 listner를 주가한다
 *
 * @param {object} tagList 태그 리스트 인스턴스
 * @param {object} args 각 항목의 정보
 * @returns {function} event listener
 */
function tagListListener(tagList, args) {
    return e => {
        if (e.target.value === "") {
            FormValidator.showValidation(args, tagList.tags);
        }
    };
}

/**
 * 각 property name을 수정하고, 생년월일을 이어 붙인 형태로 생성한다.
 *
 * @param {obect} body 요청 폼 데이터
 * @returns {object} 생성된 폼 데이터
 */
function getRefactedFormData(body) {
    const birth = `${body.f_birth_year}-${body.f_birth_month}-${body.f_birth_day}`;
    const data = {
        id: body.f_id,
        pwd: body.f_pw,
        name: body.f_name,
        birth,
        sex: body.f_sex,
        email: body.f_email,
        phone: body.f_phone,
        favorite: body.f_favorite
    };

    return data;
}

/**
 * Form 클래스로써 form 태그의 id를 부여받으면 넘겨받은 데이터에 따라 form 생성이 가능하다.
 *
 * @class Form
 */
class Form extends Component {
    constructor(id) {
        super();
        this.formElement = document.getElementById(id);
        this.tagList = {};
        this.hasValidatorItems = [];
        this.formData = {};
        this.itemEvents = {};

        // 생성하려는 항목의 이름을 key로 대입하면 필요한 함수가 value로 제공된다.
        this.makeElementOfType = {
            label: args => {
                const l = NodeBuilder.makeLabel(args);
                this.formElement.appendChild(l);
            },

            input: args => {
                const i = NodeBuilder.makeInput(args);
                this.formElement.appendChild(i);
                NodeBuilder.makeSpanValidator(args, i);
                addEventInputAndSelect(i, args);
            },

            "element-rows": args => {
                const flexCotainerDiv = document.createElement("div");
                const { elements } = args;

                flexCotainerDiv.className = "form-inputs-container";
                this.formElement.appendChild(flexCotainerDiv);
                NodeBuilder.makeSpanValidator(args, flexCotainerDiv);

                elements.forEach(eachArgs => {
                    const flexItemDiv = document.createElement("div");
                    const elementBuilder = NodeBuilder.makeElementByType();
                    const child = elementBuilder[eachArgs.type](eachArgs);

                    // eslint-disable-next-line no-param-reassign
                    eachArgs.spanValidator = args.spanValidator;
                    flexItemDiv.className = "form-flex-items";
                    flexItemDiv.appendChild(child);
                    flexCotainerDiv.appendChild(flexItemDiv);

                    addEventInputAndSelect(child, eachArgs);
                });
            },

            button: args => {
                const b = NodeBuilder.makeButton(args);
                this.formElement.appendChild(b);
            },

            select: args => {
                const s = NodeBuilder.makeSelectAndOption(args);
                this.formElement.appendChild(s);
                NodeBuilder.makeSpanValidator(args, s);

                addEventInputAndSelect(s, args);
            },

            checkboxWithText: args => {
                const div = document.createElement("div");
                const sp = NodeBuilder.makeSpan(args);
                const chk = NodeBuilder.makeInput(args);
                const { checkboxPos } = args;

                div.className = "term vertical-margin";
                const checkboxPosAdjusting = {
                    left: () => {
                        chk.style = "margin-right: 1em;";
                        div.appendChild(chk);
                        div.appendChild(sp);
                    },
                    right: () => {
                        chk.style = "margin-left: 1em;";
                        div.appendChild(sp);
                        div.appendChild(chk);
                    }
                };
                const pos = checkboxPos || "right";

                checkboxPosAdjusting[pos]();
                this.formElement.appendChild(div);
            },

            "tag-list": args => {
                const { nameAndId, minTag } = args;
                const newTagList = new TagList(nameAndId, minTag);
                this.formElement.appendChild(newTagList.element);

                NodeBuilder.makeSpanValidator(args, newTagList.element);
                newTagList.inputElem.addEventListener(
                    "focus",
                    tagListListener(newTagList, args)
                );

                newTagList.inputElem.addEventListener(
                    "input",
                    tagListListener(newTagList, args)
                );

                this.tagList[nameAndId] = newTagList;
            }
        };

        // 값을 알고자 하는 항목의 이름을 key로 대입하면 유효성 검사 시 필요한 정보가 오브젝트 형태로 value에 제공된다.
        this.getValueOfEachType = {
            input: elem => {
                const { value } = this.formElement.querySelector(
                    `#${elem.nameAndId}`
                );
                return {
                    value,
                    denySentence: elem.denySentence,
                    id: elem.nameAndId
                };
            },
            select: elem => {
                // same function => input
                const { value } = this.formElement.querySelector(
                    `#${elem.nameAndId}`
                );
                return {
                    value,
                    denySentence: elem.denySentence,
                    id: elem.nameAndId
                };
            },
            checkboxWithText: elem => {
                const { checked } = this.formElement.querySelector(
                    `#${elem.nameAndId}`
                );
                return {
                    value: checked,
                    denySentence: elem.denySentence,
                    id: elem.nameAndId
                };
            },
            "element-rows": rows => {
                const r = [];
                rows.elements.forEach(elem => {
                    const { value } = document.querySelector(
                        `#${elem.nameAndId}`
                    );
                    r.push({
                        value,
                        denySentence: elem.denySentence,
                        validator: elem.validator,
                        id: elem.nameAndId
                    });
                });

                return r;
            },
            "tag-list": elem => {
                const tagList = this.tagList[elem.nameAndId];
                const value = tagList.tags;

                return {
                    value,
                    denySentence: elem.denySentence,
                    id: tagList.inputElem.id
                };
            }
        };
    }

    /**
     *
     *
     * @param {*} formData
     * @returns
     * @memberof Form
     */
    build(formData) {
        formData.forEach(itemData => {
            this.makeElementOfType[itemData.type](itemData);
            if (itemData.validator) {
                this.hasValidatorItems.push(itemData);
            }
        });

        return this;
    }

    /**
     * 폼을 초기화 시킨다.
     *
     * @memberof Form
     */
    reset() {
        this.formElement.reset();
        const elems = this.formElement.querySelectorAll(".okay, .warning");
        for (let i = 0; i < elems.length; i += 1) {
            elems[i].classList.remove("okay");
            elems[i].classList.remove("warning");
        }

        Object.values(this.tagList).forEach(tagList => {
            tagList.reset();
        });
    }

    /**
     * 각 항목에 대해 유효성 검사를 수행한다
     *
     * @param {string} value 대상이 되는 값
     * @param {array} denySentence 실패 시 문장리스트
     * @param {function} doValidate 유효성 검사 수행 함수
     * @param {string} id 대상의 Element id
     * @returns {object} { result, denySentence, id }
     * @memberof Form
     */
    async validateEachItems(value, denySentence, doValidate, id) {
        this.formData[id] = value;

        const { result, failCase } = await doValidate(value);
        return {
            result,
            denySentence: denySentence[failCase],
            id
        };
    }

    /**
     * 폼의 각 전체 항목에 대해 유효성 검사를 수행한다.
     *
     * @returns
     * @memberof Form
     */
    async validate() {
        const res = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const itemData of this.hasValidatorItems) {
            // 1. 유효성 검사를 위해 각 Form 항목의 값을 가져온다
            const valueforValidate = this.getValueOfEachType[itemData.type](
                itemData
            );
            const { validator } = itemData;

            // 2. 단일 항목과 여러 Element들이 있는 한 항목을 분기하여 처리
            if (Array.isArray(valueforValidate)) {
                valueforValidate.forEach(async row => {
                    const { value, denySentence = "", id } = row;
                    const thisValidator = row.validator;
                    // 3. { id, value } 형태로 formData(form 전송 시 사용) 저장
                    res.push(
                        await this.validateEachItems(
                            value,
                            denySentence,
                            thisValidator,
                            id
                        )
                    );
                });
            } else {
                const { value, denySentence = "", id } = valueforValidate;
                res.push(
                    await this.validateEachItems(
                        value,
                        denySentence,
                        validator,
                        id
                    )
                );
            }
        }

        return res;
    }

    /**
     * 폼 내용을 제출한다.
     *
     * @param {string} [serverUrl=''] 요청 url
     * @param {function} successFn 성공 시 수행하는 함수
     * @param {function} failFn 실패 시 수행하는 함수
     * @memberof Form
     */
    async submit(serverUrl = "") {
        if (serverUrl === "") {
            return;
        }

        return await requestServer(
            "POST",
            getRefactedFormData(this.formData),
            serverUrl
        );
    }

    /**
     * 폼 유효성 검사를 수행하고 그 결과를 반환
     *
     * @returns {string} 수행 결과 (성공 시 'success' 반환)
     * @memberof Form
     */
    async getValidateResult() {
        const validatedResultArr = await this.validate();
        let sentence = "";
        let focusId = "";

        validatedResultArr.some(v => {
            sentence = !v.result ? v.denySentence : "";
            focusId = v.id;
            return !v.result;
        });

        if (sentence !== "") {
            document.querySelector(`#${focusId}`).focus();
            return sentence;
        }

        return "success";
    }

    get container() {
        return this.formElement;
    }
}

export default Form;
