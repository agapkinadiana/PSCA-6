
module.exports = (Sequelize, sequelize) => {
    return sequelize.define('auditorium', {
        auditorium: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        auditorium_name: {
            type: Sequelize.STRING
        },
        auditorium_capacity: {
            type: Sequelize.INTEGER
        },
        auditorium_typename: {
            type: Sequelize.STRING
        }
    });
};
