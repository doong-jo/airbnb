import Component from "./component.js";
import getCardView from "../../views/card-view.js";
import {
    on,
    containClass,
    findChildren,
    setHTML,
    addClass,
    removeClass,
    getAttribute
} from "../utils/light-dom.js";
import _ from "../services/constants.js";

class Card extends Component {
    constructor() {
        super();

        this.CLASS_CONTAINER = "card-container";
        this.CLASS_CARD = "item";
        this.CLASS_IMG = "img";
        this.CLASS_IMG_SPRITE_PLAY = `${this.CLASS_IMG}-sprite-play`;
        this.CLASS_TITLE = "title";
        this.CLASS_CIRCLE_CONTAINER = "circle-container";
        this.CLASS_CIRCLE = `${this.CLASS_CIRCLE_CONTAINER}__circle`;
        this.CLASS_CIRCLE_SELECTED = "circle-selected";
        this.CLASS_CARD_SCALE_UP = `${this.CLASS_CARD}-scale-up`;
        this.CLASS_IMG_SCALE_UP = `${this.CLASS_IMG}-scale-up`;
        this.ATTR_CARD_INDEX = "card-index";
        this.ATTR_CIRCLE_INDEX = "circle-index";

        this.circleClickHandler = this.circleClickHandler.bind(this);
        this.cardClickHandler = this.cardClickHandler.bind(this);
        this.spriteAnimOverHandler = this.spriteAnimOverHandler.bind(this);
        this.spriteAnimOutHandler = this.spriteAnimOutHandler.bind(this);
        this.followByCircleIndex = this.followByCircleIndex.bind(this);

        this.options = {
            minLength: 2,
            maxLength: 5,
            animSpriteIndexArr: [0]
        };
    }

    render() {
        setHTML(this.elContainer, this.view);
        this.processWhenAfterRender();

        return this;
    }

    processWhenAfterRender() {
        this.makeElementVariables();
        this.setListeners();
        this.applyCardFocus(0);
        this.applyCircleFocus(0);
    }

    build(data) {
        if (!Array.isArray(data) || data.length < this.options.minLength) {
            throw new Error("Card needs array of items");
        }
        this.data =
            data.length > 5 ? data.slice(0, this.options.maxLength) : data;
        this.view = getCardView(this);

        return this;
    }

    setListeners() {
        on(this.elContainer, "click", this.cardClickHandler);
        on(this.elContainer, "click", this.circleClickHandler);
        if (this.options.animSpriteIndexArr) {
            for (const cardIndex of this.options.animSpriteIndexArr) {
                on(
                    this.cardContainers[cardIndex],
                    "mouseover",
                    this.spriteAnimOverHandler
                );
            }
        }

        on(this.elContainer, "mouseout", this.spriteAnimOutHandler);
    }

    makeElementVariables() {
        this.cardContainers = findChildren(
            this.elContainer,
            `.${this.CLASS_CARD}`
        );

        this.cardImgs = findChildren(this.elContainer, `.${this.CLASS_IMG}`);
        this.circleContainers = findChildren(
            this.elContainer,
            `.${this.CLASS_CIRCLE_CONTAINER}`
        );

        this.circles = [];
        for (const circleContainer of [...this.circleContainers]) {
            this.circles = this.circles.concat([...circleContainer.children]);
        }
    }

    cardClickHandler(e) {
        const targetCard = e.target.parentElement;
        if (!containClass(targetCard, this.CLASS_CARD)) {
            return;
        }
        const cardIndex = getAttribute(targetCard, this.ATTR_CARD_INDEX);
        const circleIndex = (() => {
            let acc = 0;
            for (let i = 0; i < cardIndex; i++) {
                acc += this.data[i].items;
            }
            return acc;
        })();

        this.applyCardFocus(cardIndex);
        this.applyCircleFocus(circleIndex);

        console.log(circleIndex);
        if (this.circleChangeHandler) {
            this.circleChangeHandler(circleIndex);
        }
    }

    circleClickHandler(e) {
        const targetCircleContainer = e.target.parentElement;
        if (!containClass(targetCircleContainer, this.CLASS_CIRCLE_CONTAINER)) {
            return;
        }
        const { target } = e;
        const circleIndex = getAttribute(target, this.ATTR_CIRCLE_INDEX);

        this.applyCircleFocus(circleIndex);

        if (this.circleChangeHandler) {
            this.circleChangeHandler(circleIndex);
        }
    }

    isNotImgInCard(target, targetCard) {
        // is not focus card and didn't start play animation
        return (
            !containClass(targetCard, this.CLASS_CARD) ||
            containClass(target, this.CLASS_IMG_SPRITE_PLAY) ||
            !containClass(target, this.CLASS_IMG) ||
            this.focusCard === targetCard
        );
    }

    isNotSpriteAnimation(target, targetCard) {
        // is card and is not img
        return (
            containClass(targetCard, this.CLASS_CARD) ||
            !containClass(target, this.CLASS_IMG)
        );
    }

    spriteAnimOverHandler(e) {
        const { target } = e;
        const targetCard = target.parentElement;
        if (this.isNotImgInCard(target, targetCard)) {
            return;
        }

        this.curSprite = target;
        addClass(this.curSprite, this.CLASS_IMG_SPRITE_PLAY);
    }

    spriteAnimOutHandler(e) {
        const { target } = e;
        const targetCard = target.parentElement;
        if (!this.isNotSpriteAnimation(target, targetCard)) {
            return;
        }

        if (this.curSprite) {
            removeClass(this.curSprite, this.CLASS_IMG_SPRITE_PLAY);
        }
    }

    applyCircleFocus(circleIndex) {
        if (this.selectedCircle) {
            removeClass(this.selectedCircle, this.CLASS_CIRCLE_SELECTED);
        }
        this.selectedCircle = this.circles[circleIndex];

        addClass(this.selectedCircle, this.CLASS_CIRCLE_SELECTED);
    }

    applyCardFocus(index) {
        if (this.focusCard) {
            removeClass(this.focusCard, this.CLASS_CARD_SCALE_UP);
            removeClass(this.focusCardImg, this.CLASS_IMG_SCALE_UP);
        }

        this.focusCard = this.cardContainers[index];
        this.focusCardImg = this.cardImgs[index];

        addClass(this.focusCard, this.CLASS_CARD_SCALE_UP);
        addClass(this.focusCardImg, this.CLASS_IMG_SCALE_UP);
    }

    getCardIndexByCircleIndex(circleIndex) {
        let result = 0;
        let acc = 0;
        for (let i = 0; i < this.data.length; i++) {
            acc += this.data[i].items;
            if (acc > circleIndex) {
                result = i;
                return result;
            }
        }
    }

    followByCircleIndex(circleIndex) {
        const cardIndex =
            circleIndex === 0
                ? circleIndex
                : this.getCardIndexByCircleIndex(circleIndex);

        this.applyCardFocus(cardIndex);
        this.applyCircleFocus(circleIndex);
    }

    setChangeCircleHandler(handler) {
        this.circleChangeHandler = handler;
    }
}

export default Card;
