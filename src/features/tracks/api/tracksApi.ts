import { baseApi } from '@/app/api/baseApi.ts'
import type { FetchTracksResponse } from './trackApi.types.ts'

export const tracksApi = baseApi.injectEndpoints({
    endpoints: build => ({
        fetchTracks: build.infiniteQuery<
            FetchTracksResponse,
            void,
            string | null
        >({
            infiniteQueryOptions: {
                initialPageParam: null,
                getNextPageParam: lastPage => {
                    return lastPage.meta.nextCursor || null
                },
            },
            query: ({ pageParam }) => ({
                url: 'playlists/tracks',
                params: {
                    cursor: pageParam,
                    paginationType: 'cursor',
                    pageSize: 10,
                },
            }),
        }),
    }),
})

export const { useFetchTracksInfiniteQuery } = tracksApi
