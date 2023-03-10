const { Sequelize } = require("sequelize");
const config = require("./config");

const db = new Sequelize(config.development);

module.exports = db;
