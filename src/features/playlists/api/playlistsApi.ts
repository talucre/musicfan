import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
    CreatePlaylistArgs,
    PlaylistData,
    PlaylistsResponse,
    UpdatePlaylistArgs,
} from './playlistsApi.types.ts'

export const playlistsApi = createApi({
    reducerPath: 'playlistsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        headers: {
            'API-KEY': import.meta.env.VITE_API_KEY,
        },
        prepareHeaders: headers => {
            headers.set(
                'Authorization',
                `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
            )
            return headers
        },
    }),
    endpoints: build => ({
        fetchPlaylists: build.query<PlaylistsResponse, void>({
            query: () => `playlists`,
        }),
        createPlaylist: build.mutation<
            { data: PlaylistData },
            CreatePlaylistArgs
        >({
            query: attributes => ({
                url: 'playlists',
                method: 'post',
                body: {
                    data: {
                        type: 'playlists',
                        attributes,
                    },
                },
            }),
        }),
        updatePlaylist: build.mutation<
            void,
            { playlistId: string; attributes: UpdatePlaylistArgs }
        >({
            query: ({ playlistId, attributes }) => ({
                url: `playlists/${playlistId}`,
                method: 'put',
                body: {
                    data: {
                        type: 'playlists',
                        attributes,
                    },
                },
            }),
        }),
        deletePlaylist: build.mutation<void, string>({
            query: playlistId => ({
                url: `playlists/${playlistId}`,
                method: 'delete',
            }),
        }),
    }),
})

export const {
    useFetchPlaylistsQuery,
    useCreatePlaylistMutation,
    useUpdatePlaylistMutation,
    useDeletePlaylistMutation,
} = playlistsApi
