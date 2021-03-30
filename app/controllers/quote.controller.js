const db = require("../models");
const Quote = db.Quotation;
const Op = db.Sequelize.Op;
const {createQuote, createQuoteLog} = require("../services/quotation.service")

exports.CreateQuote = (req, res) =>{
    var d = new Date(req.body.inception_date);
    var EndDate = d.setFullYear(d.getFullYear() + 1);
    

    var Datenow = new Date().toLocaleString();
    console.log(Datenow);

    const dataQuotes = {
        CustomerID : req.body.customerid,
        AgentID: req.body.agentid,
        CreateDate: Datenow,
        TOC: req.body.product_id,
        Topro: req.body.coverage_id,
        Region: req.body.region_id,
        StartDate: req.body.inception_date,
        EndDate: EndDate,
        MainSI: req.body.sum_insured_1,
        Premium: req.body.total_payable, //Total Premium
        DiscPCT: req.body.discount_pct,
        DiscAmount: req.body.total_discount, //Total discount
        PolicyCost: req.body.total_premium,
        StampDuty: req.body.total_stamp_duty,
        Status: req.body.status,
        PolicyNo: req.body.policyNo,
        ANO: req.body.ANO
    };

    const PremiumDetails = req.body.premium_details;
    // console.log(PremiumDetails[0].amount) ;

    createQuote(dataQuotes,(err,results)=>{
        if (err) {
            return res.json({
                message: err 
            });
        }
        else{
            try {
                createQuoteLog(results);
                res.status(200).send({
                    results
                });

            } catch (error) {
                
            }
            
        }

    });

};