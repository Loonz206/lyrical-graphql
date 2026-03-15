import mongoose from "mongoose";
import { GraphQLError } from "graphql";

/**
 * Validates that the given value is a well-formed MongoDB ObjectId string.
 * Throws a GraphQLError if the value is invalid, preventing user-controlled
 * data from being used directly in database queries (NoSQL injection guard).
 */
export function assertValidObjectId(id: unknown, fieldName = "id"): string {
  if (typeof id !== "string" || !mongoose.Types.ObjectId.isValid(id)) {
    throw new GraphQLError(`Invalid ${fieldName}: must be a valid ObjectId.`);
  }
  return id;
}
