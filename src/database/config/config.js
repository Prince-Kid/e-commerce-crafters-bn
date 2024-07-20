require("dotenv").config();

const config = {
  development: {
    url: process.env.DATABASE_DEVELOPMENT_URL,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: true,
      }
    }
  },
  test: {
    url: process.env.DATABASE_TEST_URL,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: true,
      }
    }
  },
  production: {
    url: process.env.DATABASE_PRODUCTION_URL,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: true,
      }
    }
  },
};

module.exports = config;
<<<<<<< HEAD



=======
>>>>>>> 0cff03db707fc42c5a1f30a76827dea013e4c413
