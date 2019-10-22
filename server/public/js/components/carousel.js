import {
    findChild,
    findChildren,
    on,
    setStyle,
    setHTML
} from "../utils/light-dom.js";
import { watchPageVisibility } from "../utils/light-api.js";
import _ from "../services/constants.js";
import Component from "../components/component.js";
import CarouselView from "../../views/carousel-view.js";

class Carousel extends Component {
    constructor() {
        super();

        this.TYPE_MINI = "mini";
        this.TYPE_FULL = "full";
        this.WIDTH_MINI_CAROUSEL_SLIDE = 14;
        this.WIDTH_FULL_CAROUSEL_SLIDE = 55;
        this.DIR_LEFT = "left";
        this.DIR_RIGHT = "right";
        this.CLASS_ARROW = "arrow";
        this.CLASS_SLIDE_LIST = "slide-list";
        this.CLASS_SLIDE = "scroller-slide";
        this.CLASS_CIRCLE_COTAINER = "circle-container";
        this.ATTR_INDEX = "data-index";

        this.options = {
            type: this.TYPE_MINI,
            prevButton: true,
            nextButton: true,
            slideSpeed: 300,
            lazyload: false,
            mouseDrag: false,
            arrowKeys: false,
            autoPlay: false,
            autoPlaySpeed: 3000,
            stopAutoPlayWhenPageHidden: false
        };

        this.execByType(
            () => {
                this.CLASS_CAROUSEL_CONTAINER = "mini-carousel-container";
            },
            () => {
                this.CLASS_CAROUSEL_CONTAINER = "full-carousel-container";
            }
        );

        this.jumpCnt = 1;
        this.clickArrowHandler = this.clickArrowHandler.bind(this);
        this.transitionEndOfSlideList = this.transitionEndOfSlideList.bind(
            this
        );
        this.playAuto = this.playAuto.bind(this);
    }

    render() {
        setHTML(this.elContainer, this.view);
        this.processWhenAfterRender();

        return this;
    }

    processWhenAfterRender() {
        this.curIndex = this.getCurrentSlideIndex();
        this.makeElementVariables();
        this.doActionOfOptions();
        this.setListeners();
    }

    build(data) {
        this.data = data;

        this.execByType(
            () => {
                this.cursorPosX = Carousel.caculateStartPosOfCarousel(
                    this.data.children.length,
                    this.WIDTH_MINI_CAROUSEL_SLIDE
                );
                this.slideWidth = this.WIDTH_MINI_CAROUSEL_SLIDE;
            },
            () => {
                const countSlidesOfFullType = () => {
                    const totalCount = data.reduce((acc, cur) => {
                        acc = acc + cur.length;
                        return acc;
                    }, 0);

                    return totalCount;
                };

                this.totalSlideCnt = countSlidesOfFullType(this.data);
                this.cursorPosX = Carousel.caculateStartPosOfCarousel(
                    this.totalSlideCnt,
                    this.WIDTH_FULL_CAROUSEL_SLIDE
                );
                this.slideWidth = this.WIDTH_FULL_CAROUSEL_SLIDE;
            }
        );

        this.view = CarouselView.getView(
            this.options.type,
            data,
            this.cursorPosX
        );

        return this;
    }

    setListeners() {
        on(this.leftArrow, "click", this.clickArrowHandler(this.DIR_LEFT));
        on(this.rightArrow, "click", this.clickArrowHandler(this.DIR_RIGHT));
        on(this.slideList, "transitionend", this.transitionEndOfSlideList);
    }

    makeElementVariables() {
        const arrows = findChildren(this.elContainer, `.${this.CLASS_ARROW}`);
        const [leftArrow, rightArrow] = arrows;
        this.leftArrow = leftArrow;
        this.rightArrow = rightArrow;
        this.slideList = findChild(
            this.elContainer,
            `.${this.CLASS_SLIDE_LIST}`
        );
    }

    doActionOfOptions() {
        setStyle(
            this.slideList,
            "transition",
            `transform ${this.options.slideSpeed}ms`
        );

        if (this.options.autoPlay) {
            this.playAuto();
            if (this.options.stopAutoPlayWhenPageHidden) {
                watchPageVisibility(this.playAuto, () => {
                    clearInterval(this.autoPlayAlarm);
                });
            }
        }
    }

    execByDirection(dir, fnWhenLeft, fnWhenRight) {
        const directionExec = {};
        directionExec[this.DIR_LEFT] = () => {
            fnWhenLeft();
        };
        directionExec[this.DIR_RIGHT] = () => {
            fnWhenRight();
        };
        directionExec[dir]();
    }

    execByType(fnMini, fnFull) {
        const typeExec = {};
        typeExec[this.TYPE_MINI] = () => {
            fnMini();
        };
        typeExec[this.TYPE_FULL] = () => {
            fnFull();
        };
        typeExec[this.options.type]();
    }

    transitionEndWhenLeftMove() {
        let moveSlide;
        const slides = findChildren(this.elContainer, `.${this.CLASS_SLIDE}`);
        moveSlide = slides[slides.length - 1];
        this.slideList.insertAdjacentElement("afterbegin", moveSlide);
    }

    transitionEndWhenRightMove() {
        const firstSlide = findChild(this.elContainer, `.${this.CLASS_SLIDE}`);
        this.slideList.insertAdjacentElement("beforeend", firstSlide);
    }

    transitionEndOfSlideList(e) {
        this.replaceSlides(this.lastDirection);
        this.jumpCnt = 1;
        if (this.changeSlideHandler) {
            const movedIndex = this.getCurrentSlideIndex();
            this.changeSlideHandler(movedIndex);
        }

        setStyle(this.slideList, "transition", "");
        setStyle(
            this.slideList,
            "transform",
            `translateX(-${this.cursorPosX}rem)`
        );
    }

    replaceSlides(dir) {
        for (let i = 0; i < this.jumpCnt; i++) {
            this.execByDirection(
                dir,
                () => {
                    this.transitionEndWhenLeftMove();
                },
                () => {
                    this.transitionEndWhenRightMove();
                }
            );
        }
    }

    clickArrowHandler(direction) {
        return function(e) {
            if (this.options.autoPlay) {
                this.playAuto();
            }

            this.execByDirection(
                direction,
                () => {
                    this.prevSlide();
                },
                () => {
                    this.nextSlide();
                }
            );
        }.bind(this);
    }

    playAuto() {
        if (this.autoPlayAlarm) {
            clearInterval(this.autoPlayAlarm);
        }

        this.autoPlayAlarm = setInterval(
            this.nextSlide.bind(this),
            this.options.autoPlaySpeed
        );
    }

    prevSlide() {
        this.curIndex -= 1;
        this.curIndex = this.curIndex >= this.totalSlideCnt ? 0 : this.curIndex;
        this.jumpToSlide(1);
    }

    nextSlide() {
        this.curIndex += 1;
        this.curIndex = this.curIndex < 0 ? this.totalSlideCnt : this.curIndex;
        this.jumpToSlide(-1);
    }

    setSlideStyle(slidSpeed, translateX) {
        setStyle(this.slideList, "transition", `transform ${slidSpeed}ms`);
        setStyle(this.slideList, "transform", `translateX(${translateX}rem)`);
    }

    getCurrentSlideIndex() {
        const slides = findChildren(this.elContainer, `.${this.CLASS_SLIDE}`);
        const curPos = Carousel.caculateStartPosOfCarousel(slides.length);
        const curIndex = slides[curPos].getAttribute(this.ATTR_INDEX);
        return +curIndex;
    }

    calcMoveCount(slides, destIndex) {
        let moveDir = 0;
        let moveCnt = 0;
        let isMeetDestIndex = false;
        let isMeetCurIndex = false;

        for (let i = 0; i < slides.length; i++) {
            const slideIndex = +slides[i].getAttribute(this.ATTR_INDEX);
            if (isMeetDestIndex && isMeetCurIndex) {
                break;
            }

            if (isMeetDestIndex || isMeetCurIndex) {
                moveCnt += moveDir;
            }

            if (destIndex === slideIndex) {
                isMeetDestIndex = true;
                moveDir = 1;
            } else if (this.curIndex === slideIndex) {
                isMeetCurIndex = true;
                moveDir = -1;
            }
        }

        return moveCnt;
    }

    moveToSlide(destIndex) {
        destIndex = +destIndex;
        const slides = findChildren(this.elContainer, `.${this.CLASS_SLIDE}`);
        if (destIndex === this.curIndex) {
            return;
        }

        const moveCnt = this.calcMoveCount(slides, destIndex);
        this.curIndex = destIndex;
        this.jumpToSlide(moveCnt);
    }

    jumpToSlide(moveCnt) {
        const distance = moveCnt * this.slideWidth;
        this.lastDirection = moveCnt > 0 ? this.DIR_LEFT : this.DIR_RIGHT;
        this.jumpCnt = Math.abs(moveCnt);

        this.setSlideStyle(
            this.options.slideSpeed,
            -this.cursorPosX + distance
        );
    }
    static caculateStartPosOfCarousel(total, eachWidth = 1) {
        // (전체 개수 / 2) - (짝수 ? -1 : 0) * 개당 너비
        return (Math.floor(total / 2) - +!(total & 1)) * eachWidth;
    }

    setChangeSlideHandler(handler) {
        this.changeSlideHandler = handler;
    }
}

export default Carousel;
