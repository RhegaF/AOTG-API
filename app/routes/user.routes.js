module.exports = app => {
    const user = require("../controllers/user.controller.js");
    const { checktoken } = require("../auth/token_validation")

    let router = require("express").Router();

    // Routes
    router.post("/create",checktoken, user.createUser);

    router.get("/:id",checktoken, user.findUser);

    router.post("/login",  user.getLogin);

    //Prefix
    app.use("/api/user", router);
}