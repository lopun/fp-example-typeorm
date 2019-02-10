import dotenv from "dotenv";
import R from "ramda";
// 모든 설정 전에 호출해야한다.
const path = R.ifElse(
  R.equals("development"),
  R.always(".env"),
  R.always(".env.production")
)(process.env.NODE_ENV);
dotenv.config({ path });

import app from "./app";
import { createConnection } from "typeorm";
import ormConfig from "./ormConfig";

// app starting console!
const PORT: number = Number(process.env.PORT) || 3000;
const handleAppStart = () => console.log(`Listening on port ${PORT}`);
const appListener = () => app.listen(PORT, handleAppStart);

// db 연결
R.tryCatch(
  R.pipe(
    createConnection,
    R.then(appListener)
  ),
  console.log
)(ormConfig);
