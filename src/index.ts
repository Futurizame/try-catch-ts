/**
 * Result from calling tryFn
 */
export type Result<T, E> = { val: T; err: E };

/**
 * Successful result returns value
 */
export type Successful<T> = Result<T, undefined>;

/**
 * Erroneous result returns error
 */
export type Erroneous<E> = Result<undefined, E>;

/**
 * tryFn wraps fn callback, if everything is ok, no error will be returned, otherwise error will be returned
 * @param fn async function
 */
export const tryFn = async <T = unknown, E = unknown>(
  fn: () => Promise<T>
): Promise<Successful<T> | Erroneous<E>> => {
  try {
    const val = await fn();

    return { val, err: undefined };
  } catch (error) {
    return { val: undefined, err: error as E };
  }
};

/**
 * tryFn for synchronous fn callback
 * @param fn sync function
 */
export const tryFnSync = <T = unknown, E = unknown>(
  fn: () => T
): Successful<T> | Erroneous<E> => {
  try {
    const val = fn();

    return { val, err: undefined };
  } catch (error) {
    return { val: undefined, err: error as E };
  }
};

/**
 * util function to check if result have error
 * @param result result from calling tryFn
 */
export const isErroneous = <T, E>(
  result: Successful<T> | Erroneous<E>
): result is Erroneous<E> => {
  return !!result.err;
};

/**
 * util function to check if result have value
 * @param result result from calling tryFn
 */
export const isSuccessful = <T, E>(
  result: Successful<T> | Erroneous<E>
): result is Successful<T> => {
  return !!result.val;
};
