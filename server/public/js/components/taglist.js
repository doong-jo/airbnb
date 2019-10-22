import Component from "./component.js";
import NodeBuilder from "../utils/node-builder.js";

/**
 * 태그 리스트 클래스
 *
 * @class TagList
 */
class TagList extends Component {
    /**
     * 태그 리스트 생성자
     * @param {string} id 태그 리스트 element id
     * @param {number} min 태그 최솟값
     * @memberof TagList
     */
    constructor(id, min) {
        super();
        this.CLOSE_SVG_PATH = "/img/close.svg";

        this.tagElement = document.createElement("div");
        this.tagElement.className = "tag-container vertical-margin";
        this.tagElement.id = `${id}-list`;
        this.tagData = [];
        this.minTag = min;

        this.init(id);
    }

    /**
     * 태그 리스트 DOM 객체 생성
     *
     * @param {string} id 태그 리스트 element id
     * @memberof TagList
     */
    init(id) {
        this.tagInput = NodeBuilder.makeInput({
            inputType: "text",
            nameAndId: id
        });

        for (let i = 0; i < this.tagData.length; i += 1) {
            this.makeTag(this.tagData[i]);
        }
        this.tagElement.appendChild(this.tagInput);

        this.registerEvents();
    }

    /**
     * 태그 초기화
     *
     * @memberof TagList
     */
    reset() {
        this.tagData = [];

        NodeBuilder.removeChildren(
            this.tagElement,
            child => child.tagName !== "INPUT"
        );
    }

    /**
     * 이벤트 리스너 설정
     *
     * @memberof TagList
     */
    registerEvents() {
        this.tagInput.addEventListener("input", this.inputEvent.bind(this));
        this.tagInput.addEventListener("keydown", this.keyDownEvent.bind(this));
    }

    /**
     * 태그 리스트 내 입력상자 이벤트
     * 태그 명 + ',' 입력 시 태그 생성
     * 백스페이스 누를 시 태그 박스가 사라지고 태그가 수정가능한 상태로 전환
     *
     * @param {*} e
     * @returns
     * @memberof TagList
     */
    inputEvent(e) {
        const inp = e.data;
        const { length, value } = this.tagInput;
        if (inp === null) {
            return;
        }
        if (
            inp === "," || // check hangul '가,'
            (inp.length === 2 && String(inp)[1] === ",")
        ) {
            this.tagInput.value = this.tagInput.value.trim();
            if (this.tagInput.value !== ",") {
                this.addTag();
            }

            this.tagInput.value = "";
        } else if (inp === "Backspace" && length > 0 && value === "") {
            this.removeLastTag();
        }
    }

    /**
     * 태그 리스트 내 입력상자 키 입력 이벤트
     *
     * @param {*} e event listner의 인자
     * @memberof TagList
     */
    keyDownEvent(e) {
        const inp = e.key;
        const { value } = this.tagInput;
        const { length } = this.tagData;

        if (inp === "Backspace" && length > 0 && value === "") {
            this.removeLastTag();
            e.preventDefault();
        }
    }

    /**
     * 마지막 태그 삭제
     *
     * @memberof TagList
     */
    removeLastTag() {
        this.tagInput.value = this.tagData.pop();

        const tagBoxes = this.tagElement.querySelectorAll(".tag-box");
        tagBoxes[tagBoxes.length - 1].remove();
    }

    /**
     * 클릭한 태그 삭제
     *
     * @param {*} e
     * @memberof TagList
     */
    removeClickedTag(e) {
        const { parentElement } = e.target;
        const tagBoxes = this.tagElement.querySelectorAll(".tag-box");
        const idx = Array.from(tagBoxes).indexOf(parentElement);

        parentElement.remove();
        this.tagData.splice(idx, 1);
    }

    /**
     * 태그 추가
     *
     * @memberof TagList
     */
    addTag() {
        const tagStr = this.tagInput.value.slice(0, -1);

        this.makeTag(tagStr);
        this.tagData.push(tagStr);
    }

    /**
     * 태그 생성
     *
     * @param {*} tagStr
     * @memberof TagList
     */
    makeTag(tagStr) {
        const div = document.createElement("div");
        const span = document.createElement("span");
        const img = document.createElement("img");

        span.innerHTML = tagStr;
        img.src = this.CLOSE_SVG_PATH;
        img.alt = "close";
        img.onclick = this.removeClickedTag.bind(this);

        div.className = "tag-box";
        div.appendChild(span);
        div.appendChild(img);

        const { length } = this.tagElement.querySelectorAll(".tag-box");

        if (length < 1) {
            this.tagElement.insertAdjacentElement("afterbegin", div);
        } else {
            this.tagInput.insertAdjacentElement("beforebegin", div);
        }
    }

    get tags() {
        return this.tagData;
    }

    get element() {
        return this.tagElement;
    }

    get inputElem() {
        return this.tagElement.querySelector("input");
    }

    get id() {
        return this.tagElement.id;
    }

    get min() {
        return this.minTag;
    }
}

export default TagList;
