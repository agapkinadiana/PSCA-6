const Sequelize = require('sequelize');
//const sequelize = new Sequelize('L18', 'NODEJS', 'NODEJS', {host: "127.0.0.1", port:"1433", dialect: 'mssql'});

const config = require('./../config').db.mysql;

const sequelize = new Sequelize(config.db_name, config.username, config.password, config.options);

const auditoriums = require('./models/auditorium')(Sequelize, sequelize);
const auditoriumTypes = require('./models/auditorium-type')(Sequelize, sequelize);

const faculties = require('./models/faculty')(Sequelize, sequelize);
const pulpits = require('./models/pulpit')(Sequelize, sequelize);
const subjects = require('./models/subject')(Sequelize, sequelize);
const teachers = require('./models/teacher')(Sequelize, sequelize);


auditoriums.belongsTo(auditoriumTypes, {foreignKey: 'auditorium_typename'});
pulpits.belongsTo(faculties, {foreignKey: 'faculty_name'});
subjects.belongsTo(pulpits, {foreignKey: 'pulpit_name'});
teachers.belongsTo(pulpits, {foreignKey: 'pulpit_name'});


module.exports = {
    Auditoriums: auditoriums,
    AuditoriumTypes: auditoriumTypes,

    Faculties: faculties,
    Pulpits: pulpits,
    Subjects: subjects,
    Teachers: teachers,

    Sequelize: Sequelize,
    sequelize: sequelize
};

