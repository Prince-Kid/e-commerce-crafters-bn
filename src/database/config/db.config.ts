// import { config } from "dotenv";
// import { Sequelize } from "sequelize";

// config();
// const NODE_ENV: string = process.env.NODE_ENV || "development";
// const HOST_MODE: string = process.env.HOST_MODE || "remote";

// function getURL(): string {
//   switch (NODE_ENV) {
//     case "development":
//       return process.env.DATABASE_DEVELOPMENT_URL as string;
//     case "test":
//       return process.env.DATABASE_TEST_URL as string;
//     default:
//       return process.env.DATABASE_PRODUCTION_URL as string;
//   }
// }

// function getDialectOptions() {
//   return HOST_MODE === "local"
//     ? {}
//     : {
//         ssl: {
//           require: true,
//           rejectUnauthorized: false,
//         },
//       };
// }

// const connectSequelize: Sequelize = new Sequelize(getURL(), {
//   dialect: "postgres",
//   dialectOptions: getDialectOptions(),
//   logging: false,
// });

// export default connectSequelize;

import { Sequelize } from "sequelize";
const config = require("./config");
import dotenv from "dotenv";
dotenv.config();

const MODE: any = process.env.MODE || "development";

const currentConfig = config[`${MODE}`];

const connectSequelize: Sequelize = new Sequelize(
  currentConfig.database,
  currentConfig.username,
  currentConfig.password,
  {
    host: currentConfig.host,
    dialect: currentConfig.dialect,
    dialectOptions: {},
  }
);


export default connectSequelize;
