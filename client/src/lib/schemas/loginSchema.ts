import { z } from 'zod'

export const LoginSchame = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export type LoginType = z.infer<typeof LoginSchame>;