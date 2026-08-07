import { z } from "zod";
export const ArenaInvokeSchema = z.object({
    input: z.string().min(1, "Input prompt cannot be empty").max(4000, "Input prompt is too long"),
});
//# sourceMappingURL=arena.schema.js.map