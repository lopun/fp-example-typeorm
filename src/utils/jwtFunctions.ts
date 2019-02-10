import R from "ramda";
import jwt from "jsonwebtoken";
import User from "../entities/User";
import { selfOrEmptyString, propViewer } from "./helpfulFunctions";

export const verifyJWT = R.curry(jwt.verify)(
  R.__,
  selfOrEmptyString(process.env.JWT_TOKEN)
);

export const cleanNullArgs = args =>
  R.pipe(
    R.keys,
    R.filter(key => args[key] !== null),
    R.map(key => ({ [key]: args[key] })),
    R.apply(Object.assign, R.__)
  )(args);

export const createJWT = R.curry(jwt.sign)(
  R.__,
  selfOrEmptyString(process.env.JWT_TOKEN)
);

const getId = propViewer("id");
const findUser = id => User.findOne({ id });
export const decodeJWT = R.tryCatch(
  R.pipe(
    verifyJWT,
    getId,
    findUser,
    R.then(R.identity)
  ),
  R.always(undefined)
);
