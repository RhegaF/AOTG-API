const db = require("../models");
const Quote = db.Quotation;
const Op = db.Sequelize.Op;
const {createCoverageDetail,createQuote, createQuoteLog, createQuoteDetail, updateFrontView, updateBackView, updateLeftView, updateRightView, createorupdateCustomer, updateCustomerQuotation} = require("../services/quotation.service")
// const FormData = require('form-data')
// require('../models/care/motor.model');
const multer = require('multer');
const path = require("path");
const fs = require('fs');
const { create } = require("domain");

const DIRFRONT = path.join(__dirname, '../../uploads/frontview');
const DIRBACK = path.join(__dirname, '../../uploads/backview');
const DIRLEFT = path.join(__dirname, '../../uploads/leftview');
const DIRRIGHT = path.join(__dirname, '../../uploads/rightview');


var Datenow = new Date().toLocaleString();

exports.CreateQuote = async (req, res) =>{
    var d = new Date(req.body.inception_date);
    var EndDate = d.setFullYear(d.getFullYear() + 1);
    // console.log(Datenow);

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
        Premium: req.body.total_premium, //Total Premium
        DiscPCT: req.body.discount_pct,
        DiscAmount: req.body.total_discount, //Total discount
        PolicyCost: req.body.total_payable,
        StampDuty: req.body.total_stamp_duty,
        Status: req.body.status,
        PolicyNo: req.body.policyNo,
        ANO: req.body.ANO
    };

    const PremiumDetails = req.body.premium_details;
    const VehicleDetails = req.body.vehicle_detail;
    const Customer = req.body.customer_detail;

    const dataVehicle = {
        QuotationID : null,
        Brand : VehicleDetails.brand,
        Model : VehicleDetails.model,
        Type  : VehicleDetails.type,
        LicenseNo  : VehicleDetails.license_number,
        EngineNo  : VehicleDetails.engine_number,
        ChassisNo  : VehicleDetails.chassis_number,
        Year  : VehicleDetails.manufactured_year
    };
    const dataCustomer = {
        // CustomerID : null,
        CustomerName : Customer.name,
        IDType : Customer.id_type,
        IDNo : Customer.id_number,
        Gender : Customer.gender,
        BirthDate : Customer.birth_date,
        Citizenship : Customer.id_citizenship,
        Email : Customer.email,
        PhoneNo : Customer.telephone_number,
        Address : Customer.address_1,
        City : Customer.city,
        ZipCode : Customer.zipcode
    };
    // console.log(req.body.model) ;

     createQuote(dataQuotes, async (err,results) => {
        if (err) {
            return res.json({
                message: err 
            });
        }
        else{
            try {
                createorupdateCustomer(dataCustomer,(err,resultsC) => {
                    // console.log(results);
                    updateCustomerQuotation(results.QuotationID, resultsC);

                    results.CustomerID = resultsC;

                });
                dataVehicle.QuotationID = results.QuotationID;
                createQuoteDetail(dataVehicle);
                createQuoteLog(results);
                
                createCoverageDetail(PremiumDetails,results.QuotationID,
                    req.body.sum_insured_1,req.body.discount_pct);
               await res.status(200).send({
                    results
                });

            } catch (error) {
                
            }
            
        }

    });

};

exports.uploadFrontView = (req, res) => {
    const id = req.params.id;

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, DIRFRONT)
        },
        filename: function (req, file, cb) {
            cb(null, id +"_"+ file.originalname )
        }
      })
       
    var upload = multer({ storage: storage }).single('frontFile')
    upload(req, res, function (err) {
        if (err) {
            // An error occurred when uploading
        }
        const filePath = req.file.path;
        if (filePath != null || undefined) {
            updateFrontView(id,filePath);
            res.json({
                success: true,
                message: 'Image uploaded!'
            });
        } else {
            res.status(201).json({
                success: false,
                message: 'No Image uploaded!'
            });
        }

        
    })
    
};

exports.uploadBackView = (req, res) => {
    const id = req.params.id;
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, DIRBACK)
        },
        filename: function (req, file, cb) {
            cb(null, id +"_"+ file.originalname )
        }
      })
       
    var upload = multer({ storage: storage }).single('backFile')
    upload(req, res, function (err) {
        if (err) {
            // An error occurred when uploading
        }
        
        const filePath = req.file.path;
        if (filePath != null || undefined) {
             updateBackView(id,filePath);
             res.json({
                 success: true,
                 message: 'Image uploaded!'
             });
         } else {
             res.status(201).json({
                 success: false,
                 message: 'No Image uploaded!'
             });
         }

        // updateBackView(id,filePath);
        // res.json({
        //     success: true,
        //     message: 'Image uploaded!'
        // });
    })
    
};

exports.uploadLeftView = (req, res) => {
    const id = req.params.id;

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, DIRLEFT)
        },
        filename: function (req, file, cb) {
            cb(null, id +"_"+ file.originalname )
        }
      })
       
    var upload = multer({ storage: storage }).single('leftFile')
    upload(req, res, function (err) {
        if (err) {
            // An error occurred when uploading
        }
        const filePath = req.file.path;
        if (filePath != null || undefined) {
            updateLeftView(id,filePath);
            res.json({
                success: true,
                message: 'Image uploaded!'
            });
        } else {
            res.status(201).json({
                success: false,
                message: 'No Image uploaded!'
            });
        }

        // updateLeftView(id,filePath);
        // res.json({
        //     success: true,
        //     message: 'Image uploaded!'
        // });
    })
    
};
exports.uploadRightView = (req, res) => {
    const id = req.params.id;

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, DIRRIGHT)
        },
        filename: function (req, file, cb) {
            cb(null, id +"_"+ file.originalname )
        }
      })
       
    var upload = multer({ storage: storage }).single('rightFile')
    upload(req, res, function (err) {
        if (err) {
            // An error occurred when uploading
        }
        const form = new FormData();
        // const test = form.append('Vehicle');
        // console.log(test)
        const filePath = req.file.path;
        if (filePath != null || undefined) {
            updateRightView(id,filePath);
            res.json({
                success: true,
                message: 'Image uploaded!'
            });
        } else {
            res.status(201).json({
                success: false,
                message: 'No Image uploaded!'
            });
        }

        // updateRightView(id,filePath);
        // res.json({
        //     success: true,
        //     message: 'Image uploaded!'
        // });
    })
    
};