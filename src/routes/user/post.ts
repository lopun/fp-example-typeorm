import User from "../../entities/User";
import { cleanUselessProperties } from "../../utils/helpfulFunctions";
import R from "ramda";

const sendResponse = res => R.curry((user, error) => res.send({ user, error }));

const post = app =>
  app.post("/user", (req, res) =>
    R.pipe(
      body => User.findOne({ email: body.email }),
      R.then(
        R.ifElse(
          R.isNil,
          R.pipe(
            () =>
              cleanUselessProperties(
                ["email", "name", "age", "password"],
                req.body
              ),
            params => User.create(params).save(),
            R.then(sendResponse(res)(R.__, null))
          ),
          sendResponse(res)(R.__, "User already exists!")
        )
      )
    )(req.body)
  );

export default post;
