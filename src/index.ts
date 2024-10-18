/**
 * Optional type with error as values.
 * If ok is true, data is the result of the operation, otherwise error is the error thrown.
 */
export type Optional<D> =
  | [ok: true, data: D, error: undefined]
  | [ok: false, data: undefined, error: Error];

const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};

/**
 * tryFn is functional try-catch that returns an Optional type.
 * @param fn function that returns a error throwable promise
 */
export const tryFn = async <D>(fn: () => Promise<D>): Promise<Optional<D>> => {
  try {
    const result = await fn();

    return [true, result, undefined];
  } catch (error) {
    if (isError(error)) {
      return [false, undefined, error];
    }

    return [false, undefined, new Error(String(error))];
  }
};

/**
 * tryFnSync is functional try-catch that returns an Optional type.
 * @param fn error throwable function
 */
export const tryFnSync = <D>(fn: () => D): Optional<D> => {
  try {
    const result = fn();

    return [true, result, undefined];
  } catch (error) {
    if (isError(error)) {
      return [false, undefined, error];
    }

    return [false, undefined, new Error(String(error))];
  }
};
