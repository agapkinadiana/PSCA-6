
module.exports = (Sequelize, sequelize) => {
    return sequelize.define('faculty', {
        faculty: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        faculty_name: {
            type: Sequelize.STRING
        }
    });
};
