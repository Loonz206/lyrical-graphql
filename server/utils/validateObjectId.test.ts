import { GraphQLError } from "graphql";
import { assertValidObjectId } from "./validateObjectId";

describe("assertValidObjectId", () => {
  const validObjectId = "507f1f77bcf86cd799439011";

  describe("with a valid ObjectId string", () => {
    it("returns the id unchanged", () => {
      expect(assertValidObjectId(validObjectId)).toBe(validObjectId);
    });

    it("returns the id when a custom fieldName is provided", () => {
      expect(assertValidObjectId(validObjectId, "songId")).toBe(validObjectId);
    });
  });

  describe("with an invalid value", () => {
    it("throws a GraphQLError for a non-ObjectId string", () => {
      expect(() => assertValidObjectId("not-a-valid-id")).toThrow(GraphQLError);
    });

    it("throws a GraphQLError for an empty string", () => {
      expect(() => assertValidObjectId("")).toThrow(GraphQLError);
    });

    it("throws a GraphQLError for a number", () => {
      expect(() => assertValidObjectId(12345)).toThrow(GraphQLError);
    });

    it("throws a GraphQLError for null", () => {
      expect(() => assertValidObjectId(null)).toThrow(GraphQLError);
    });

    it("throws a GraphQLError for undefined", () => {
      expect(() => assertValidObjectId(undefined)).toThrow(GraphQLError);
    });

    it("includes the default field name 'id' in the error message", () => {
      expect(() => assertValidObjectId("bad")).toThrow(
        "Invalid id: must be a valid ObjectId.",
      );
    });

    it("includes the custom field name in the error message", () => {
      expect(() => assertValidObjectId("bad", "songId")).toThrow(
        "Invalid songId: must be a valid ObjectId.",
      );
    });
  });
});
