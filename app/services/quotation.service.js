const db = require("../models");
const Quote = db.Quotation;
const QuoteLog = db.QuotationLog;
const QuoteDetailMV = db.QuotationMV;

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
        const Datalog ={
            QuotationID : data.QuotationID
        };
        QuoteLog.create(Datalog)
        .then((res) => {
        }).catch((err) => {
        });
    },
    createQuoteDetail :(data) => {
        QuoteDetailMV.create(data)
        .then((res) => {
        }).catch((err) => {
        });
    },

    updateFrontView :(id, data) => {
        QuoteDetailMV.update({
            FrontView: data
          }, {
            where: {
              QuotationID: id
            }
          })
            .then(() => {
            })
            .catch(err => {
            });
    },
    updateBackView :(id, data) => {
        QuoteDetailMV.update({
            BackView: data
          }, {
            where: {
              QuotationID: id
            }
          })
            .then(() => {
            })
            .catch(err => {
            });
    },
    updateLeftView :(id, data) => {
        QuoteDetailMV.update({
            LeftView: data
          }, {
            where: {
              QuotationID: id
            }
          })
            .then(() => {
            })
            .catch(err => {
            });
    },
    updateRightView :(id, data) => {
        QuoteDetailMV.update({
            RightView: data
          }, {
            where: {
              QuotationID: id
            }
          })
            .then(() => {
            })
            .catch(err => {
            });
    }
    

}