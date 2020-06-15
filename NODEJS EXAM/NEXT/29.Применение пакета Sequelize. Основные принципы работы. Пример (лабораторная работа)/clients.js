module.exports = (Sequelize, sequelize) => {
    return sequelize.define('clients', {
        Client_Id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        First_Name: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        Last_Name: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        Phone_number: {
            type: Sequelize.STRING(20),
            allowNull: false
        }
    });
}