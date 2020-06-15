
module.exports = (Sequelize, sequelize) => {
    return sequelize.define('auditorium_type', {
        auditorium_type: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        auditorium_typename: {
            type: Sequelize.STRING
        }
    });
};
