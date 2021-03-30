const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false,
    define:{
        freezeTableName: true,
        timestamps :false
    },
     timezone: '+07:00',
    // dialectOptions: {
    //     options: {
    //       useUTC: false, // for reading from database
    //     },
    //   },

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.User = require("./user.model.js")(sequelize, Sequelize);
db.Agent = require("./agent.model.js")(sequelize, Sequelize);
db.UserLog = require("./user.log.model")(sequelize, Sequelize);
db.Quotation = require("./quotation.model")(sequelize, Sequelize);
db.QuotationLog = require("./quotation.log.model")(sequelize, Sequelize);
db.QuotationMV = require("./quotation.mv.model")(sequelize, Sequelize);
db.Coverage = require("./coverage.model")(sequelize, Sequelize);
db.Response = require("./response.log.model")(sequelize, Sequelize);
db.Customer = require("./customer.model")(sequelize, Sequelize);

module.exports = db;