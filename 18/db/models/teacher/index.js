
module.exports = (Sequelize, sequelize) => {
    return sequelize.define('teacher', {
        teacher: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        teacher_name: {
            type: Sequelize.STRING
        },
        pulpit_name: {
            type: Sequelize.STRING
        }
    });
};
