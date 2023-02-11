import { Erroneous, isErroneous, Successful, tryFn, tryFnSync } from "../src";

describe("try-catch-ts", () => {
  describe("tryFn", () => {
    it("should return error when callback throws error", async () => {
      const { error } = await tryFn<void, Error>(async () => {
        throw new Error("error");
      });

      expect(error).toBeDefined();
      expect(error?.message).toBe("error");
    });

    it("should return data when callback does not throw error", async () => {
      const { error, data } = await tryFn<number, Error>(async () => 42);

      expect(error).toBeUndefined();
      expect(data).toBeDefined();
      expect(data).toBe(42);
    });
  });

  describe("tryFnSync", () => {
    it("should return error when callback throws error", () => {
      const { error } = tryFnSync<void, Error>(() => {
        throw new Error("error");
      });

      expect(error).toBeDefined();
      expect(error?.message).toBe("error");
    });

    it("should return data when callback does not throw error", () => {
      const { error, data } = tryFnSync<number, Error>(() => 42);

      expect(error).toBeUndefined();
      expect(data).toBeDefined();
      expect(data).toBe(42);
    });
  });

  describe("isErroneous", () => {
    it("should check if is falsy", () => {
      const result: Successful<number> | Erroneous<Error> = {
        error: undefined,
        data: 123,
      };

      expect(isErroneous(result)).toBeFalsy();
    });

    it("should check if is truthy", () => {
      const result: Successful<number> | Erroneous<Error> = {
        error: new Error("error"),
        data: undefined,
      };

      expect(isErroneous(result)).toBeTruthy();
    });
  });
});
