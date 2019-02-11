import User from "../../entities/User";
import R from "ramda";

const sendResponse = res =>
  R.curry((status, user, error) => res.status(status).send({ user, error }));

const post = app =>
  app.get("/user/:id", (req, res) =>
    R.tryCatch(
      R.pipe(
        params => params.id,
        id => User.findOne({ id: parseInt(id, 10) }),
        R.then(
          R.ifElse(
            R.complement(R.isNil),
            sendResponse(res)(200, R.__, null),
            () => sendResponse(res)(404, null, "User not exists!")
          )
        )
      ),
      error => sendResponse(res)(500, null, error.message)
    )(req.params)
  );

export default post;
