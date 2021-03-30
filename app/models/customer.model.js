module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("Customer", {
        CustomerID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        CreateDate: {
            allowNull: true,
            type: Sequelize.DATE
        },
        UpdateDate: {
            allowNull: false,
            type: Sequelize.DATE
        },
        CustomerName: {
            allowNull: false,
            type: Sequelize.STRING(100)
        },
        IDType: {
            allowNull: true,
            type: Sequelize.STRING(1)
        },
        IDNo: {
            allowNull: true,
            type: Sequelize.STRING(50)
        },
        Gender: {
            allowNull: true,
            type: Sequelize.STRING(1)
        },
        BirthDate: {
            allowNull: true,
            type: Sequelize.DATE
        },
        Citizenship: {
            allowNull: true,
            type: Sequelize.STRING(50)
        },
        Email: {
            allowNull: true,
            type: Sequelize.STRING(100)
        },
        PhoneNo: {
            allowNull: true,
            type: Sequelize.STRING(50)
        },
        Address: {
            allowNull: true,
            type: Sequelize.STRING(255)
        },
        City: {
            allowNull: true,
            type: Sequelize.STRING(50)
        },
        ZipCode: {
            allowNull: true,
            type: Sequelize.STRING(10)
        }

    });

    return Customer;
}