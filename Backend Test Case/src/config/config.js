require("dotenv").config();

const passDB = process.env.PASS_DB;

module.exports = {
  development: {
    username: "root",
    password: passDB,
    database: "library",
    host: "localhost",
    dialect: "mysql",
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
