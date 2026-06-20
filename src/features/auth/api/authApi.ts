import { baseApi } from '@/app/api/baseApi.ts'
import { AUTH_KEYS } from '@/common/constants'
import { withZodCatch } from '@/common/utils'
import {
    loginResponseSchema,
    meResponseSchema,
} from '@/features/auth/model/auth.schemas.ts'
import type { LoginArgs } from './authApi.types.ts'

export const authApi = baseApi.injectEndpoints({
    endpoints: build => {
        return {
            getMe: build.query({
                query: () => 'auth/me',
                ...withZodCatch(meResponseSchema),
                providesTags: ['Auth'],
            }),
            login: build.mutation({
                query: (payload: LoginArgs) => ({
                    url: '/auth/login',
                    method: 'post',
                    body: { ...payload, accessTokenTTL: '10m' },
                }),
                onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
                    const { data } = await queryFulfilled
                    localStorage.setItem(
                        AUTH_KEYS.accessToken,
                        data.accessToken,
                    )
                    localStorage.setItem(
                        AUTH_KEYS.refreshToken,
                        data.refreshToken,
                    )
                    dispatch(authApi.util.invalidateTags(['Auth']))
                    // Need to invalidate tags here by hand because
                    // It won't work correctly in invalidatesTags property because
                    // getMe request will be sent before tokens will be set
                },
                ...withZodCatch(loginResponseSchema),
            }),
            logout: build.mutation<void, void>({
                query: () => {
                    const refreshToken = localStorage.getItem(
                        AUTH_KEYS.refreshToken,
                    )
                    return {
                        url: '/auth/logout',
                        method: 'post',
                        body: {
                            refreshToken,
                        },
                    }
                },
                onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
                    await queryFulfilled
                    localStorage.removeItem(AUTH_KEYS.accessToken)
                    localStorage.removeItem(AUTH_KEYS.refreshToken)
                    dispatch(baseApi.util.resetApiState())
                },
            }),
        }
    },
})

export const { useGetMeQuery, useLoginMutation, useLogoutMutation } = authApi
