const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;
const { genSaltSync, hashSync, compare } = require("bcrypt");
const { getLoginUser, createUser, getUserByPK, getLoginUserJoin } = require("../services/user.service")
const { sign } = require("jsonwebtoken");
const dbkey = require("../config/db.config")

// Create and Save a new Post
exports.createUser = (req, res) => {
    // Validate request
    if (!req.body.UserName) {
        res.status(400).send({
            message: "UserName harus diisi"
        });
        return ;
    }

    // Create a Post
    const salt = genSaltSync(10);
    let HasPassword = hashSync(req.body.Password, salt);
    const post = {
        UserID : req.body.UserID,
        UserName: req.body.UserName,
        AgentID: req.body.AgentID,
        Password: HasPassword,
        Role: req.body.Role 
    };

    // Save Post in the database
    createUser(post,(err,results)=>{
        if (err) {
            return res.json({
                success: 0,
                message: "Gagal Create User"
            });
        }
        else{
            res.status(200).send({
                results
            })
        }

    });
};

exports.findUser = (req, res) => {
    const id = req.params.id;
    
    getUserByPK(id, (err, results)=>{
        if (err) {
            return res.status(500).send({
                message: "Error Retrieving Data"

            });
        } else {
            res.status(200).send({
                results
            })
        }

    });
};


exports.getLogin =(req, res) => {
    const UserName = req.body.UserName;
    const password = req.body.Password;
    let condition = {UserName : UserName}

    getLoginUserJoin(condition,(err, results) => {
        if (err) {
            return res.json({
                success: 0,
                message: "User atau Password salah"
            });
        }
        else{
            compare(password,  results.Password, function(err, match) {
                if (err) throw new Error(err);
                else if (match == false) {
                    return res.json({
                        success: false,
                        message: 'User atau Password salah',
                        data : results
                    })
                } else {
                    // const result = null;
                    results.Password = undefined;

                    const jsontoken =sign({results}, dbkey.key, {
                        expiresIn: "1h"
                    });
                    return res.json({
                        succes: true,
                        message: "Sukses Login",
                        user : results,
                        token : jsontoken
                    })
                }
            });
        }
        
        
    });
};