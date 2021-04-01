const db = require("../models");
const Quote = db.Quotation;
const QuoteLog = db.QuotationLog;
const QuoteDetailMV = db.QuotationMV;
const Customer = db.Customer;
const Coverage = db.Coverage;

module.exports = {
    createQuote: (data, callback) => {
        Quote.create(data)
            .then((res) => {
                if (res != null) {
                    try {
                        return callback(null, res["dataValues"]);
                    }
                    catch (error) {
                        return callback(error);
                    }
                }
                return callback(null, res["dataValues"]);
            }).catch((err) => {
                return callback(err);
            });
    },
    createQuoteLog: (data) => {
        const Datalog = {
            QuotationID: data.QuotationID
        };
        QuoteLog.create(Datalog)
            .then((res) => {
            }).catch((err) => {
            });
    },
    createQuoteDetail: (data) => {
        QuoteDetailMV.create(data)
            .then((res) => {
            }).catch((err) => {
            });
    },
    createCoverageDetail: (data, id, SI, DiscPCT) => {
        for (let i = 0; i < data.length; i++) {
            const dataCoverage = {
                QuotationID : id,
                RateCode : data[i].coverage_code,
                IsMain : data[i].is_main,
                SumInsured : SI,
                Rate : data[i].rate,
                Premium : data[i].amount,
                DiscPCT : DiscPCT,
                AdminFee : data[i].admin_fee,
                CoverageDetail : data[i].coverage_detail,
            };
            Coverage.create(dataCoverage)
            .then((res) => {
            }).catch((err) => {
            });
        };
        
    },
    updateCustomerQuotation: (id, data) => {
        // console.log(id,data);
        Quote.update({
            CustomerID: data,
            UpdateDate : Date.now()
        }, {
            where: {
                QuotationID: id
            }
        });
    },


    createorupdateCustomer: (datasend, callback) => {
        let condition = {
            IDType: datasend.IDType,
            IDNo: datasend.IDNo,
            CustomerName: datasend.CustomerName
        };
        Customer.findAll(
            {
                where: condition,
                raw: true
            })
            .then((data) => {
                if (data[0] != null) {
                    try {
                        Customer.update({
                            UpdateDate: Date.now()
                        }, {
                            where: {
                                CustomerID: data[0].CustomerID
                            }
                        });

                        return callback(null, data[0].CustomerID);

                    }
                    catch (error) {
                        return callback(error);
                    }
                    
                }
                else {
                    Customer.create(datasend)
                    .then((res) => {
                        if (res != null) {
                            try {
                                return callback(null, res["dataValues"].CustomerID);
                            }
                            catch (error) {
                                return callback(error);
                            }
                        }
                        
                    }).catch((err) => {
                    });
                }

            }).catch((error) => {
                return callback(error);
            });
    },

    updateFrontView: (id, data) => {
        QuoteDetailMV.update({
            FrontView: data
        }, {
            where: {
                QuotationID: id
            }
        })
    },
    updateBackView: (id, data) => {
        QuoteDetailMV.update({
            BackView: data
        }, {
            where: {
                QuotationID: id
            }
        })
    },
    updateLeftView: (id, data) => {
        QuoteDetailMV.update({
            LeftView: data
        }, {
            where: {
                QuotationID: id
            }
        })
    },
    updateRightView: (id, data) => {
        QuoteDetailMV.update({
            RightView: data
        }, {
            where: {
                QuotationID: id
            }
        })
    }


}