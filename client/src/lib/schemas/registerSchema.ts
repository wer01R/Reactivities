import { z } from "zod";
import { requiredString } from "../util/util";

export const RegisterSchame = z.object({
  email: z.string().email(),
  displayName: requiredString("displayName"),
  password: requiredString("password")
});

export type RegisterType = z.infer<typeof RegisterSchame>;