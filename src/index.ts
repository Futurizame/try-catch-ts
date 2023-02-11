/**
 * Result from calling tryFn
 */
export type Result<T, E> = { data: T; error: E };

/**
 * Successful result returns data
 */
export type Successful<T> = Result<T, undefined>;

/**
 * Erroneous result returns error
 */
export type Erroneous<E> = Result<undefined, E>;

/**
 * tryFn wraps fn param, if everything is ok, no error will be returned, otherwise error will be returned
 * @param fn async function
 */
export const tryFn = async <T = unknown, E = unknown>(
  fn: () => Promise<T>
): Promise<Successful<T> | Erroneous<E>> => {
  try {
    const data = await fn();

    return { data, error: undefined };
  } catch (error) {
    return { data: undefined, error: error as E };
  }
};

/**
 * tryFn for synchronous fn param
 * @param fn sync function
 */
export const tryFnSync = <T = unknown, E = unknown>(
  fn: () => T
): Successful<T> | Erroneous<E> => {
  try {
    const data = fn();

    return { data, error: undefined };
  } catch (error) {
    return { data: undefined, error: error as E };
  }
};

/**
 * util function to check if result have error
 * @param result result from calling tryFn
 */
export const isErroneous = <T, E>(
  result: Successful<T> | Erroneous<E>
): result is Erroneous<E> => {
  return !!result.error;
};
