const express = require("express");
const router = express.Router();

router.post("/create-question-paper");
router.get("/total-no-of-question");
router.get("/generate-question-paper");


module.exports = router