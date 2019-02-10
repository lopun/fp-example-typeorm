import cors from "cors";
import helmet from "helmet";
import express from "express";
import routes from "./routes";
import bodyParser = require("body-parser");

const app = express();
/* const jwtMiddleware = (req, _, next) => {
  console.log(req.get("JWT"));
  R.pipe(
    req.get,
    selfOrUndefined,
    decodeJWT,
    R.then(user => Object.assign(req, { user })),
    R.then(next)
  )("JWT");
}; */

app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
routes(app);

export default app;
