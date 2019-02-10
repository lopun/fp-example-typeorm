import { ConnectionOptions } from "typeorm";

const ormConfig: ConnectionOptions = {
  type: "mysql",
  database: process.env.DB_NAME || "fpexample",
  synchronize: true,
  // 모든 로깅을 보게된다.
  logging: true,
  entities: [__dirname + "/entities/*.*"],
  host: process.env.DB_ENDPOINT || "localhost",
  port: parseInt(process.env.DB_PORT || "3306", 10),
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || ""
};

export default ormConfig;
