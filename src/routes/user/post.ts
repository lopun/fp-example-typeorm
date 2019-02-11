import User from "../../entities/User";
import { cleanUselessProperties } from "../../utils/helpfulFunctions";
import R from "ramda";

const sendResponse = R.curry((res, status, user, error) =>
  res.status(status).send({ user, error })
);
const createUserWithCleanParams = R.pipe(
  User.create,
  R.then(instance => instance.save())
);

const post = app =>
  app.post("/user", (req, res) =>
    R.tryCatch(
      R.pipe(
        cleanUselessProperties(["email", "name", "age", "password"]),
        body => User.findOne({ email: body.email }),
        R.then(
          R.ifElse(
            R.isNil,
            () =>
              R.pipe(
                createUserWithCleanParams,
                R.then(sendResponse(res)(201, R.__, null))
              )(req.body),
            sendResponse(res)(401, R.__, "User already exists!")
          )
        )
      )(req.body),
      error => sendResponse(res)(500, null, error.message)
    )
  );

export default post;
