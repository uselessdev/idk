import "server-only";

import { z } from "zod";

export type Result<T> =
  | { success: true; data?: T }
  | { success: false; error: string | string[] };

export function createServerAction<I, Output = void>(options: {
  schema: z.Schema<I>;
  handler: (args: I) => Promise<Result<Output>>;
}) {
  return async (data: I): Promise<Result<Output>> => {
    const payload = options.schema.safeParse(data);

    if (!payload.success) {
      return {
        success: false,
        error: payload.error.issues.map(
          (issue) => `${issue.path}: ${issue.message}`
        ),
      };
    }

    return options.handler(payload.data);
  };
}
