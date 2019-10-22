import express from "express";
import { findHouse } from "../middleware/house";

const router = express.Router();

router.get("/", findHouse);

export default router;
