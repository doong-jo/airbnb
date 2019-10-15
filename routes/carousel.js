const express = require("express");
const carouselService = require("../services/middleware/carousel");

const router = express.Router();

router.get("/card", carouselService.getCardData);
router.get("/main-carousel", carouselService.getFullCarouselData);
router.get("/mini-carousel", carouselService.getMiniCarouselData);

module.exports = router;
