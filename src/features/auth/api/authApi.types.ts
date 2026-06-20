import * as z from 'zod'
import {
    loginResponseSchema,
    type meResponseSchema,
} from '@/features/auth/model/auth.schemas.ts'

export type MeResponse = z.infer<typeof meResponseSchema>
export type LoginResponse = z.infer<typeof loginResponseSchema>

export type LoginArgs = {
    code: string
    redirectUri: string
    rememberMe: boolean
    accessTokenTTL?: string // "3m" | "1d"...
}
