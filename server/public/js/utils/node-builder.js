const NodeBuilder = {
    /**
     * css를 head안에 추가한다.
     *
     * @param {string} id 추가될 css id
     */
    appendCSS(id) {
        const link = document.createElement("link");
        link.id = id;
        link.href = `public/css/${id}.css`;
        link.type = "text/css";
        link.rel = "stylesheet";

        document.getElementsByTagName("head")[0].appendChild(link);
    },

    /**
     * css를 삭제한다
     *
     * @param {string} id 삭제될 css id
     */
    removeCSS(id) {
        document.querySelector(`link[id=${id}]`).disabled = true;
    },

    /**
     * css를 disabled 상태로 만든다.
     *
     * @param {string} id disabled될 css id
     */
    disalbeCSS(id) {
        document.querySelector(`link[id=${id}]`).disabled = true;
    },

    /**
     * css를 enable 상태로 만든다.
     * : diabled를 false로 변경
     *
     * @param {string} id enabled될 css id
     */
    enableCSS(id) {
        document.querySelector(`link[id=${id}]`).disabled = false;
    },

    /**
     * 모든 child를 삭제한다
     *
     * @param {Element} parent 부모 element
     * @param {boolean} [cond=() => true] 삭제할 조건
     */
    removeChildren(parent, cond = () => true) {
        const { children } = parent;

        for (let i = children.length - 1; i >= 0; i -= 1) {
            if (cond(children[i])) {
                parent.removeChild(children[i]);
            }
        }
    },

    /**
     * Input element를 생성한다.
     *
     * @param {object} args {
            inputType, nameAndId, placeholder,
            value, disabled, maxLength
        } 가 사용된다.
     * @returns {Element} 생성된 Element
     */
    makeInput(args) {
        const i = document.createElement("input");
        const {
            inputType,
            nameAndId,
            placeholder,
            value,
            disabled,
            maxLength
        } = args;

        i.type = inputType;
        i.name = nameAndId;
        i.id = nameAndId;
        if (maxLength) {
            i.maxLength = maxLength;
        }

        if (inputType !== "checkbox") {
            i.placeholder = placeholder || "";
        } else {
            i.value = value;
            i.disabled = disabled;
        }

        return i;
    },

    /**
     * Label element를 생성한다.
     *
     * @param {object} args {
            for, innerHTML
        } 가 사용된다.
     * @returns {Element} 생성된 Element
     */
    makeLabel(args) {
        const l = document.createElement("label");

        l.htmlFor = args.for;
        l.innerHTML = args.innerHTML;

        return l;
    },

    /**
     * Select, Option element를 생성한다.
     *
     * @param {object} args {
            selectedInd, values, nameAndId
        } 가 사용된다.
     * @returns {Element} 생성된 Element
     */
    makeSelectAndOption(args) {
        const s = document.createElement("select");
        const { selectedInd, values, nameAndId } = args;

        s.id = nameAndId;
        s.name = nameAndId;
        values.forEach((v, i) => {
            const o = document.createElement("option");
            o.value = v;
            o.innerHTML = v;

            if (i === selectedInd) {
                o.selected = true;
            }

            s.appendChild(o);
        });

        return s;
    },

    /**
     * Button element를 생성한다.
     *
     * @param {object} args {
            text, doAction, className,
            disabled, attrType
        } 가 사용된다.
     * @returns {Element} 생성된 Element
     */
    makeButton(args) {
        const btn = document.createElement("button");
        const { text, doAction, className, disabled, attrType } = args;

        btn.type = attrType;
        btn.innerHTML = text;
        btn.onclick = doAction;
        btn.className = className || "";
        btn.disabled = disabled;

        return btn;
    },

    /**
     * Option element를 replace 한다.
     *
     * @param {object} s 부모 Select Element
     * @param {array} options [{value, innerHTML}] 형식으로써 생성될 option 값들
     * @returns {Element} 생성된 Element
     */
    makeOptionsOfSelect(s, options) {
        this.removeChildren(s);

        Object.values(options).forEach(v => {
            const opt = document.createElement("option");
            opt.value = v;
            opt.innerHTML = v;

            s.appendChild(opt);
        });
    },

    /**
     * Span element를 생성한다.
     *
     * @param {object} args {
            className, innerHTML, onclick,
            textClassName, textOnClick, text,
            underlined
        } 가 사용된다.
     * @returns {Element} 생성된 Element
     */
    makeSpan(args) {
        const sp = document.createElement("span");
        const {
            className,
            innerHTML,
            onclick,
            textClassName,
            textOnClick,
            text,
            underlined
        } = args;
        const underlineStyle =
            "text-decoration: underline; text-underline-position: under;";
        sp.className = textClassName || className;
        sp.innerHTML = text || innerHTML;
        sp.onclick = textOnClick || onclick;
        sp.style = underlined ? underlineStyle : "";

        return sp;
    },

    /**
     * 각 element 생성에 사용되는 함수들을 반환한다.
     *
     * @returns {object} [오브젝트이름, 오브젝트 생성함수]
     */
    makeElementByType() {
        return {
            input: this.makeInput,
            label: this.makeLabel,
            select: this.makeSelectAndOption,
            checkbox: this.makeInput,
            button: this.makeButton
        };
    },

    /**
     * validation을 표시하는 span을 생성한다.
     * args에 spanValidator속성을 추가하고 element를 대입한다.
     *
     * @param {*} args 생성될 args
     * @param {*} parentElem validation 대상이 되는 element
     * @returns {Element} SpanValidator
     */
    makeSpanValidator(args, parentElem) {
        const sp = NodeBuilder.makeSpan({
            className: "form-validator vertical-margin",
            innerHTML: "&nbsp;"
        });

        parentElem.insertAdjacentElement("afterend", sp);
        // eslint-disable-next-line no-param-reassign
        if (Array.isArray(args)) {
            args.forEach(v => {
                v.spanValidator = sp;
            });
        } else {
            args.spanValidator = sp;
        }

        return sp;
    }
};

export default NodeBuilder;
