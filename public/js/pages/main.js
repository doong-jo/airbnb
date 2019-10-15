import Page from "./page.js";
import _ from "../services/constants.js";
import { fetchData, requestServer } from "../utils/light-api.js";
import { $$, setStyle, on, goToPage } from "../utils/light-dom.js";
import mainView from "../../views/main-view.js";
import Card from "../components/card.js";
import Carousel from "../components/carousel.js";

class Main extends Page {
    constructor() {
        super();
        this.view = mainView;
    }

    async build() {
        this.makeElementVariables();
        this.showLoginState();
        this.setListeners();

        const miniCarouselData = await fetchData(_.URL.MINI_CAROUSEL);
        const mainCarouselData = await fetchData(_.URL.MAIN_CAROUSEL);
        const cardData = await fetchData(_.URL.CARD);

        const card = new Card()
            .init("#card", {
                minLength: 2,
                maxLength: 5,
                animSpriteIndexArr: [0]
            })
            .build(cardData)
            .render();

        const cardCarousel = new Carousel()
            .init("#full-carousel", {
                slideSpeed: 1000,
                type: "full"
            })
            .build(mainCarouselData)
            .render();

        card.setChangeCircleHandler(
            cardCarousel.moveToSlide.bind(cardCarousel)
        );
        cardCarousel.setChangeSlideHandler(card.followByCircleIndex.bind(card));

        const miniCarousel = new Carousel()
            .init("#mini-carousel", {
                type: "mini",
                slideSpeed: 300,
                autoPlaySpeed: 3000,
                stopAutoPlayWhenPageHidden: true,
                autoPlay: true
            })
            .build(miniCarouselData)
            .render();
    }

    makeElementVariables() {
        this.loginBtn = $$(".login-btn");
        this.logoutBtn = $$(".logout-btn");
    }

    setListeners() {
        on(this.logoutBtn, "click", async () => {
            await requestServer(_.METHOD.POST, {}, _.URL.LOGOUT);
            goToPage(_.PAGE_HASH.LOGIN);
        });
    }

    async showLoginState() {
        const loginState = await requestServer(_.METHOD.POST, {}, _.URL.AUTH);

        if (loginState) {
            setStyle(this.logoutBtn, "display", "inline-block");
            return;
        }

        setStyle(this.loginBtn, "display", "inline-block");
    }
}

export default Main;
