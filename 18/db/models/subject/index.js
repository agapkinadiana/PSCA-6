
module.exports = (Sequelize, sequelize) => {
    return sequelize.define('subject', {
        subject: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        subject_name: {
            type: Sequelize.STRING
        },
        pulpit_name: {
            type: Sequelize.STRING
        }
    });
};
