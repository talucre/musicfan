import { baseApi } from '@/app/api/baseApi.ts'
import type {
    CreatePlaylistArgs,
    PlaylistData,
    PlaylistsResponse,
    UpdatePlaylistArgs,
} from './playlistsApi.types.ts'

export const playlistsApi = baseApi.injectEndpoints({
    endpoints: build => ({
        fetchPlaylists: build.query<PlaylistsResponse, void>({
            query: () => `playlists`,
            providesTags: ['Playlist'],
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
            invalidatesTags: ['Playlist'],
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
            invalidatesTags: ['Playlist'],
        }),
        deletePlaylist: build.mutation<void, string>({
            query: playlistId => ({
                url: `playlists/${playlistId}`,
                method: 'delete',
            }),
            invalidatesTags: ['Playlist'],
        }),
    }),
})

export const {
    useFetchPlaylistsQuery,
    useCreatePlaylistMutation,
    useUpdatePlaylistMutation,
    useDeletePlaylistMutation,
} = playlistsApi
