import R from "ramda";

export const selfOrUndefined = R.cond([
  [R.isNil, R.always(undefined)],
  [R.T, R.identity]
]);
export const selfOrEmptyString = R.cond([
  [R.complement(R.isNil), R.identity],
  [R.T, R.always("")]
]);
export const selfOrEmptyArray = R.cond([
  [R.complement(R.isEmpty), R.identity],
  [R.T, R.always([])]
]);

export const alt = R.curry((func1, func2, val) => func1(val) || func2(val));

export const propViewer = R.view(R.lensProp);

export const propSetter = R.pipe(
  R.lensProp,
  R.set
);
