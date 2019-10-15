const amazonCardData = require("../../public/json/amazon-card-data.json");
const amazonCarouselData = require("../../public/json/amazon-carousel-data.json");
const miniCarouselData = require("../../public/json/carousel-data.json");

function getCardData(req, res) {
    res.json(amazonCardData);
}

function getFullCarouselData(req, res) {
    res.json(amazonCarouselData);
}

function getMiniCarouselData(req, res) {
    res.json(miniCarouselData);
}

module.exports = {
    getCardData,
    getFullCarouselData,
    getMiniCarouselData
};
