async function fetchItemData() {
    const items = await fetch("/item", {
        method: "GET",
        query: {}
    });

    items;
}

$(document).ready(async function() {
    // const itemData = await fetchItemData();
    const itemPage = new ItemPage().init(/*itemData*/);
});

class ItemPage {
    constructor() {
        this.data = {};

        this.$elCardRects = [];
        this.$elCardItemRects = [];
        this.$elMiniRects = [];
        this.$elMiniUploadInputs = [];
        this.$cardSubmitBtn = {};
        this.$cardItemSubmitBtn = {};
        this.$applyBtn = {};

        this.clickedCardInd = 0;
        this.clickedCardItemInd = 0;
        this.clickedMiniInd = 0;

        this.clickCardRectHandler = this.clickCardRectHandler.bind(this);
        this.clickCardItemRectHandler = this.clickCardItemRectHandler.bind(
            this
        );
        this.clickMiniRectHandler = this.clickMiniRectHandler.bind(this);
        this.clickSubmitCard = this.clickSubmitCard.bind(this);
        this.clickSubmitCardItem = this.clickSubmitCardItem.bind(this);
        this.clickApply = this.clickApply.bind(this);
    }

    init(data) {
        this.data = data;
        console.log(this.data);

        this.makeElementVariables();
        this.setListeners();
    }

    makeElementVariables() {
        this.$elCardRects = $(".card");
        this.$elCardItemRects = $(".card-item");
        this.$elMiniRects = $(".mini");
        this.$elMiniUploadInputs = $(".mini-upload");
        this.$cardSubmitBtn = $(".card-submit");
        this.$cardItemSubmitBtn = $(".card-item-submit");
        this.$applyBtn = $(".apply");
    }

    setListeners() {
        this.$elCardRects.click(this.clickCardRectHandler);
        this.$elCardItemRects.click(this.clickCardItemRectHandler);
        this.$elMiniRects.click(this.clickMiniRectHandler);
        this.$cardSubmitBtn.click(this.clickSubmitCard);
        this.$cardItemSubmitBtn.click(this.clickSubmitCardItem);
        this.$applyBtn.click(this.clickApply);
    }

    clickCardRectHandler(e) {
        const { target } = e;
        const $target = $(target.parentElement);
        if (!$target.hasClass("card")) {
            return;
        }
        const index = +$target.attr("data-index") - 1;
        this.clickedCardInd = index;
    }

    clickCardItemRectHandler(e) {
        const { target } = e;
        const $target = $(target.parentElement);
        if (!$target.hasClass("card-item")) {
            return;
        }
        const index = +$target.attr("data-index") - 1;
        this.clickedCardItemInd = index;
    }

    clickMiniRectHandler(e) {
        const { target } = e;
        const $target = $(target.parentElement);
        if (!$target.hasClass("mini")) {
            return;
        }

        const index = +$target.attr("data-index") - 1;
        this.$elMiniUploadInputs.get(index).click();
        this.clickedMiniInd = index;
    }

    clickSubmitCard(e) {
        // this.fiddleData();
        console.log("click submit of card");
    }

    clickSubmitCardItem(e) {
        // this.fiddleData();
        console.log("click submit of card item");
    }

    fiddleData() {}

    clickApply(e) {
        // use fetch api (post)
    }
}
