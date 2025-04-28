import { z } from "zod";
import { requiredString } from "../util/util";

export const ProfileSchema = z.object({
  displayName: requiredString("display name"),
  bio: z.string().nullable()
})

export type ProfileType = z.infer<typeof ProfileSchema>