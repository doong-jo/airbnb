import Component from "./component.js";
import NodeBuilder from "../utils/node-builder.js";
import { findChild } from "../utils/light-dom.js";

/**
 * Modal을 생성하는 클래스
 *
 * @class Modal
 */
class Modal extends Component {
    /**
     * Modal 생성자로써 element id를 인자로 받아 element를 생성한다.
     * @param {string} id 부여할 element id
     * @memberof Modal
     */
    constructor(parent, id) {
        super();
        this.elementId = id;

        this.modalContainer = document.createElement("div");
        this.modalContainer.id = id;
        this.modalContainer.className = "modal-container";
        parent.appendChild(this.modalContainer);
    }

    /**
     * 구성정보를 options로 받아 Modal을 생성한다.
     *
     * @param {object} options
     * { width, height, top, content, footer }
     * footer: { cancleBtn,confirmBtn }
     *
     * @returns {Modal} 대상 Modal 객체
     * @memberof Modal
     */
    makeModal(options) {
        this.modalView = /* html */ `
            <div class="modal-title">
                <span class="modal-title-text">${options.title}</span>
                <img alt="close" class="close" src="/img/close.svg" />
            </div>
            <div class="modal-content"></div>
            <div class="modal-footer"></div>
        `;

        this.modalContainer.insertAdjacentHTML("beforeend", this.modalView);
        this.closeBtn = findChild(this.modalContainer, ".close");
        this.closeBtn.addEventListener("click", () => {
            this.toggle(false);
        });

        const { width, height, top, content, footer } = options;
        this.setSize(width, height, top);
        if (content) this.setContent(content);
        if (footer) this.setButtons(footer);

        return this;
    }

    /**
     * Modal의 사이즈를 결정한다.
     *
     * @param {string} width 너비 값(css의 단위 표현)
     * @param {string} height 높이 값(css의 단위 표현)
     * @param {string} top top 위치 값(css의 단위 표현)
     * @memberof Modal
     */
    setSize(width, height, top) {
        if (!width && !height && !top) {
            return;
        }
        this.modalContainer.style = `width : ${width}; height: ${height}; top: ${top};`;
    }

    /**
     * Modal을 보여주고 가려주는 기능을 수행한다.
     *
     * @param {boolean} trig Modal의 trigger
     * @memberof Modal
     */
    toggle(trig) {
        const mdContainerClasses = this.modalContainer.classList;

        mdContainerClasses.remove(trig ? "invisible" : "visible");
        mdContainerClasses.add(trig ? "visible" : "invisible");
    }

    /**
     * Modal의 내용을 설정한다
     *
     * @param {string} content html 값
     * @memberof Modal
     */
    setContent(content) {
        const modalContentDiv = findChild(
            this.modalContainer,
            ".modal-content"
        );
        modalContentDiv.innerHTML = content;
    }

    /**
     * Modal 내 버튼 생성을 수행한다
     *
     * @param {object} footerOptions footer 버튼 정보
     * @memberof Modal
     */
    setButtons(footerOptions) {
        const footer = findChild(this.modalContainer, ".modal-footer");

        if (footerOptions.cancleBtn) {
            const btn = NodeBuilder.makeButton(footerOptions.cancleBtn);
            btn.onclick = () => {
                this.toggle(false);
            };
            footer.appendChild(btn);
        }

        if (footerOptions.confirmBtn) {
            footer.appendChild(
                NodeBuilder.makeButton(footerOptions.confirmBtn)
            );
        }
    }

    get container() {
        return this.modalContainer;
    }
}

export default Modal;
