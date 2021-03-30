module.exports = app => {
    const quote = require("../controllers/quote.controller");
    const { checktoken } = require("../auth/token_validation")

    let router = require("express").Router();

    // Routes
    router.post("/createquote",checktoken, quote.CreateQuote);

    //Prefix
    app.use("/motor", router);
}