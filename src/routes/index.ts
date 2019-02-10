import fs from "fs";
import R from "ramda";

const exceptForIndex = R.filter(
  R.both(R.complement(R.equals("index.ts")), R.complement(R.equals("index.js")))
);

const routes = path => app =>
  R.pipe(
    R.always(fs.readdirSync(path)),
    exceptForIndex,
    R.map(dir => [dir, fs.readdirSync(path + "/" + dir)]),
    R.map(item =>
      item[1].forEach(name => require("./" + item[0] + "/" + name).default(app))
    )
  )(app);

export default routes("./src/routes");
