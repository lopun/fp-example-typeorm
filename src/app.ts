import cors from "cors";
import helmet from "helmet";
import express, { NextFunction, Request } from "express";
import R from "ramda";
import { selfOrUndefined } from "./utils/helpfulFunctions";
import { decodeJWT } from "./utils/jwtFunctions";

const app = express();
const jwtMiddleware = async (
  req: Request,
  _: any,
  next: NextFunction
): Promise<void> =>
  R.pipe(
    req.get,
    selfOrUndefined,
    decodeJWT,
    selfOrUndefined,
    R.then(user => Object.assign(req, { user })),
    R.then(next)
  )("JWT");

app.use(cors(), helmet(), jwtMiddleware);

export default app;
