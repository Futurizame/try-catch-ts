import {
  Erroneous,
  isErroneous,
  isSuccessful,
  Successful,
  tryFn,
  tryFnSync,
} from "../src";

describe("try-catch-ts", () => {
  describe("tryFn", () => {
    it("should return error when callback throws error", async () => {
      const { err } = await tryFn<void, Error>(async () => {
        throw new Error("error");
      });

      expect(err).toBeDefined();
      expect(err?.message).toBe("error");
    });

    it("should return data when callback does not throw error", async () => {
      const { err, val } = await tryFn<number, Error>(async () => 42);

      expect(err).toBeUndefined();
      expect(val).toBeDefined();
      expect(val).toBe(42);
    });
  });

  describe("tryFnSync", () => {
    it("should return error when callback throws error", () => {
      const { err } = tryFnSync<void, Error>(() => {
        throw new Error("error");
      });

      expect(err).toBeDefined();
      expect(err?.message).toBe("error");
    });

    it("should return data when callback does not throw error", () => {
      const { err, val } = tryFnSync<number, Error>(() => 42);

      expect(err).toBeUndefined();
      expect(val).toBeDefined();
      expect(val).toBe(42);
    });
  });

  describe("isErroneous", () => {
    it("should check if is falsy", () => {
      const result: Successful<number> | Erroneous<Error> = {
        err: undefined,
        val: 123,
      };

      expect(isErroneous(result)).toBeFalsy();
    });

    it("should check if is truthy", () => {
      const result: Successful<number> | Erroneous<Error> = {
        err: new Error("error"),
        val: undefined,
      };

      expect(isErroneous(result)).toBeTruthy();
    });
  });

  describe("isSuccessful", () => {
    it("should check if is falsy", () => {
      const result: Successful<number> | Erroneous<Error> = {
        err: new Error("error"),
        val: undefined,
      };

      expect(isSuccessful(result)).toBeFalsy();
    });

    it("should check if is truthy", () => {
      const result: Successful<number> | Erroneous<Error> = {
        err: undefined,
        val: 123,
      };

      expect(isSuccessful(result)).toBeTruthy();
    });
  });
});
