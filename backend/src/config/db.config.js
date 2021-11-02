const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
    process.env.DB,
    process.env.DB_USER,
    process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const dbConfig = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection Stablished')
    } catch (error) {
        console.log('Connecting Error -->', error);
        throw new Error('Error trying to connect');
    }
}


module.exports = {
    dbConfig,
    sequelize
}