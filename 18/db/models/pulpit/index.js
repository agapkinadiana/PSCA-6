
module.exports = (Sequelize, sequelize) => {
    return sequelize.define('pulpit', {
        pulpit: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        pulpit_name: {
            type: Sequelize.STRING
        },
        faculty_name: {
            type: Sequelize.STRING
        }
    });
};
