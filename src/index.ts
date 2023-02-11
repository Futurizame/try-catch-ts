/**
 * Pair utility type
 */
export type Pair<A, B> = [A, B];

/**
 * Result from calling tryFn, first value is a possible error, second value is a possible value
 */
export type Result<E = unknown, T = unknown> = Pair<E | undefined, T>;

/**
 * ErroneousResult result with error
 */
export type ErroneousResult<E, T> = Pair<E, T>;

/**
 * tryFn wraps fn param, if everything is ok, no error will be returned, otherwise error will be returned
 * @param fn async function
 */
export const tryFn = async <E = unknown, T = unknown>(
  fn: () => Promise<T>
): Promise<Result<E, T>> => {
  try {
    const result = await fn();

    return [undefined, result];
  } catch (error) {
    return [error as E, undefined as T];
  }
};

/**
 * tryFn for synchronous fn param
 * @param fn sync function
 */
export const tryFnSync = <E = unknown, T = unknown>(
  fn: () => T
): Result<E, T> => {
  try {
    const result = fn();

    return [undefined, result];
  } catch (error) {
    return [error as E, undefined as T];
  }
};

/**
 * util function to check if result have error
 * @param result
 */
export const isErroneous = <E, T>(
  result: Result<E, T>
): result is ErroneousResult<E, T> => {
  const [err] = result;

  return !!err;
};
