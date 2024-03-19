"use server";

import { z } from "zod";
import { createServerAction } from "~/create-server-action";

const formatter = {
  number: (value: string) => {
    return Number(value.replace(/\D+/g, ""));
  },
};

const schema = z.object({
  options: z
    .array(
      z.object({
        name: z.string(),
        price: z.string(),
      })
    )
    .default([]),
});

/**
 * After tests I believe the problem is the createServerAction (I still don't know why 😫),
 * bellow I export another function that works as expected.
 */
export const actionFunction = createServerAction({
  schema,
  async handler({ options = [] }) {
    try {
      console.log(`normal values from args >>>\n`, options);

      const all = options.map((option) => ({
        ...option,
        price: formatter.number(option.price),
      }));

      console.log(`\n\nafter apply the changes with map >>>\n`, all);

      return { success: true, data: options };
    } catch (error) {
      return { success: false, error: `error` };
    }
  },
});

export async function fixedActionFunction({
  options = [],
}: z.input<typeof schema>) {
  try {
    console.log(`normal values from args >>>\n`, options);

    const all = options.map((option) => ({
      ...option,
      price: formatter.number(option.price),
    }));

    console.log(`\n\nafter apply the changes with map >>>\n`, all);
  } catch (error) {
    // 🤔
  }
}
