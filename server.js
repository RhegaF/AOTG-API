const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const http = require("http");

// Models
 const db = require("./app/models"); //auto call index.js

const app = express();

let whiteList = ['http://localhost:8085'];
let corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
};

// var server = http.createServer(app);
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Sync database
//  db.sequelize.authenticate();
db.sequelize.sync({
    force : false , // To create table if exists , so make it false
    alter : false // To update the table if exists , so make it true
})
// db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Test REST API." });
});

// User Routes
require("./app/routes/user.routes")(app);
require("./app/routes/mw.motor.routes")(app);
require("./app/routes/quote.motor.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
}); 

module.exports = app