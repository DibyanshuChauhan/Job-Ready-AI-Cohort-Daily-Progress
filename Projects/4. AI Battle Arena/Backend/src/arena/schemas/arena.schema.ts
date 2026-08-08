import { z } from "zod";

// Validate POST /api/v1/arena/invoke request body
export const ArenaInvokeSchema = z.object({
  // User prompt must be between 1 and 4000 chars
  input: z
    .string()
    .min(1, "Input prompt cannot be empty")
    .max(4000, "Input prompt is too long"),

  // Pass existing session ID to continue an ongoing chat thread
  sessionId: z.string().optional().nullable(),
});

export type ArenaInvokePayload = z.infer<typeof ArenaInvokeSchema>;
