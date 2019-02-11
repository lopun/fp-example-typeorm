import User from "../../entities/User";
import { cleanUselessProperties } from "../../utils/helpfulFunctions";
import R from "ramda";

const sendResponse = res =>
  R.curry((status, user, error) => res.status(status).send({ user, error }));

const createUserWithCleanParams = R.pipe(
  cleanUselessProperties(["email", "name", "age", "password"]),
  params => User.create({ ...params }).save()
);

const post = app =>
  app.post("/user", (req, res) =>
    R.tryCatch(
      R.pipe(
        body => User.findOne({ email: body.email }),
        R.then(
          R.ifElse(
            R.isNil,
            R.pipe(
              () => createUserWithCleanParams(req.body),
              R.then(sendResponse(res)(201, R.__, null))
            ),
            sendResponse(res)(401, R.__, "User already exists!")
          )
        )
      ),
      error => sendResponse(res)(500, null, error.message)
    )(req.body)
  );

export default post;
