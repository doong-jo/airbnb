function getCardView(controller) {
    const makeImg = function(dataImg) {
        const img = /* html */ `
        <div class="${controller.CLASS_IMG}" 
            style="background-image: url(${dataImg})"></div>`;

        return img;
    }.bind(controller);

    const makeName = function(dataName) {
        const name = /* html */ `
        <div class="${controller.CLASS_TITLE}">
            ${dataName}
        </div>`;

        return name;
    }.bind(controller);

    const makeCircleContainer = function(circleIndexAcc, items) {
        let circles = "";

        for (let i = 0; i < items; i += 1) {
            // circle
            const circle = /* html */ `
            <div
                circle-index="${circleIndexAcc + i}" 
                class="${controller.CLASS_CIRCLE}"></div>`;
            circles += /* html */ `${circle}`;
        }

        let circleContainer = /* html */ `
        <div class="${controller.CLASS_CIRCLE_CONTAINER}">
            ${circles}
        </div>`;

        return circleContainer;
    }.bind(controller);

    const makeCards = function() {
        let cardElements = "";
        let cardIndex = 0;
        let circleIndex = 0;
        for (const eachData of this.data) {
            cardElements += /* html */ `
            <div 
                class="${controller.CLASS_CARD}"
                card-index="${cardIndex}" >
                ${makeImg(eachData.image)}
                ${makeName(eachData.name)}
                ${makeCircleContainer(circleIndex, eachData.items)}
            </div>`;

            circleIndex += eachData.items;
            cardIndex += 1;
        }

        return cardElements;
    }.bind(controller);

    const cardItem = /* html */ `
    <div class="${controller.CLASS_CONTAINER}">
        ${makeCards()}
    </div>`;

    return cardItem;
}

export default getCardView;
