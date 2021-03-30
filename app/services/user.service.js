const db = require("../models");
const { use } = require("../routes/motor/product");
const User = db.User;
const Agent = db.Agent;
const UserLog = db.UserLog;
const Op = db.Sequelize.Op;
const { createLog } = require("../services/userlog.service")

module.exports = {
    createUser : (data, callback) =>{

        User.create(data)
        .then((res) => {
          return  callback(null,"Sukses Create User " + data.UserName )
            
        }).catch((err) => {
            return callback(error);
        });
    },

    getUserByPK: (id, callback) => {
        User.findByPk(id)
        .then((data) => {
            data.Password = undefined;
            return  callback(null,data )
        }).catch((err) => {
            return callback(err);
        });

    },

    getLoginUser: (data, callback) => {
        User.findAll(
            { where: data,
              raw : true 
             })
            .then((data) => {
                if (data[0] != null) {
                    try {
                        return callback(null,data[0]);
                    } 
                    catch (error) {
                        return callback(error);
                    }
                }
                return callback(err,data[0]);
            }).catch((error) => {
                return callback(error);
            });
    },

    getLoginUserJoin: (data, callback) => {
        Agent.hasMany(User, {foreignKey: 'AgentID'});
        User.belongsTo(Agent, {foreignKey: 'AgentID'});
        User.findAll(
            {
                where: data,
                attributes: {exclude: ['CreateDate','UpdateDate']},
                //attributes: ['id', 'CreateDate', 'UpdateDate'],
                include: [
                  {
                    model: Agent,
                    attributes: ['AgentID', 'Name'],
                    required:false
                  },
                ]
              })
            .then((data) => {
                if (data[0] != null) {
                    try {
                        createLog(data[0]);
                        return callback(null,data[0]);
                    } 
                    catch (error) {
                        return callback(error);
                    }
                }
                return callback(err,data[0]);
            }).catch((error) => {
                return callback(error);
            });
    }
};