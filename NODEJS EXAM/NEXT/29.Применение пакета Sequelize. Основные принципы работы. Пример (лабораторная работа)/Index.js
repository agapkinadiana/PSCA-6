const Sequelize = require('sequelize');

const sequelize = new Sequelize('TaskNode29', 'Admin_User', 'password', {
    host: 'localhost',
    dialect: 'mssql',
    define: {
        timestamps: false
    },
    logging: false
});

const clients = require('./clients')(Sequelize, sequelize);
const products = require('./products')(Sequelize, sequelize);


// true => ВСЕ ДАННЫЕ УДАЛЯТСЯ И ОБНОВЛЯТСЯ В СООТВЕТСТВИИ СТРОГО С JSON ФАЙЛАМИ
// false => ВСЕ ДАННЫЕ ОСТАЮТСЯ В БД КАК ЕСТЬ

sequelize.sync({force: true})
    .then(() => console.log('Db has been synchronizing successfully'))
    .then(() => {
        return Promise.all([
            clients.bulkCreate(require('./data/clients')),
            products.bulkCreate(require('./data/products'))
        ])
    })
    .catch(err => console.log('Error while synchronizing: ' + err.toString()));
