/**
 * Optional type with error as values.
 * If ok is true, data is the result of the operation, otherwise error is the error thrown.
 */
export type Optional<D> =
  | { ok: true; data: D; error: undefined }
  | { ok: false; data: undefined; error: Error };

/**
 * Util function to return an Optional type with ok as true.
 * @param data
 */
export const optionalOk = <D>(data: D): Optional<D> => ({ ok: true, data, error: undefined });

/**
 * Util function to return an Optional type with ok as false.
 * @param error
 */
export const optionalNok = <D>(error: Error): Optional<D> => ({
  ok: false,
  data: undefined,
  error,
});

/**
 * isError is a type guard to check if the error is an instance of Error.
 * @param error
 */
export const isError = (error: unknown): error is Error => error instanceof Error;

/**
 * tryFn is functional try-catch that returns an Optional type.
 * @param fn function that returns an error throwable promise
 */
export const tryFn = async <D>(fn: () => Promise<D>): Promise<Optional<D>> => {
  try {
    const data = await fn();

    return optionalOk(data);
  } catch (error) {
    if (isError(error)) {
      return optionalNok(error);
    }

    return optionalNok(new Error(String(error)));
  }
};

/**
 * tryFnSync is functional try-catch that returns an Optional type.
 * @param fn error throwable function
 */
export const tryFnSync = <D>(fn: () => D): Optional<D> => {
  try {
    const data = fn();

    return optionalOk(data);
  } catch (error) {
    if (isError(error)) {
      return optionalNok(error);
    }

    return optionalNok(new Error(String(error)));
  }
};
