import { z } from "zod";

export const errorApiSchema = z.object({
  status: z.number().lt(600).gte(400),
  cause: z.string(),
});
