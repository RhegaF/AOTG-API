const db = require("../models");
const Quote = db.Quotation;
const QuoteLog = db.QuotationLog;

module.exports = {
    createQuote : (data , callback) => {
        Quote.create(data)
        .then((res) => {
            if (res != null) {
                try {
                    return callback(null,res["dataValues"]);
                } 
                catch (error) {
                    return callback(error);
                }
            }
            return callback(null,res["dataValues"]);
        }).catch((err) => {
            return callback(err);
        });
    },
    createQuoteLog :(data) => {
        // console.log(data);
        // return 'ok'
        // var Datenow = new Date().toLocaleString();
        const Datalog ={
            QuotationID : data.QuotationID
            // CreateDate : Datenow
        };
        QuoteLog.create(Datalog)
        .then((res) => {
        }).catch((err) => {
        });
    }
}