import { baseApi } from '@/app/api/baseApi.ts'
import type {
    CreatePlaylistArgs,
    FetchPlaylistsArgs,
    PlaylistData,
    PlaylistsResponse,
    UpdatePlaylistArgs,
} from './playlistsApi.types.ts'
import type { Images } from '@/common/types'

export const playlistsApi = baseApi.injectEndpoints({
    endpoints: build => ({
        // Playlists
        fetchPlaylists: build.query<PlaylistsResponse, FetchPlaylistsArgs>({
            query: params => ({ url: 'playlists', params }),
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
            onQueryStarted: async (
                { playlistId, attributes },
                { queryFulfilled, dispatch, getState },
            ) => {
                const args = playlistsApi.util.selectCachedArgsForQuery(
                    getState(),
                    'fetchPlaylists',
                )

                const patchCollections: { undo: () => void }[] = []

                args.forEach(arg => {
                    patchCollections.push(
                        dispatch(
                            playlistsApi.util.updateQueryData(
                                'fetchPlaylists',
                                {
                                    pageNumber: arg.pageNumber,
                                    pageSize: arg.pageSize,
                                    search: arg.search,
                                },
                                state => {
                                    const index = state.data.findIndex(
                                        playlist => playlist.id === playlistId,
                                    )
                                    if (index !== -1) {
                                        state.data[index].attributes = {
                                            ...state.data[index].attributes,
                                            ...attributes,
                                        }
                                    }
                                },
                            ),
                        ),
                    )
                })

                try {
                    await queryFulfilled
                } catch {
                    patchCollections.forEach(patchCollection =>
                        patchCollection.undo(),
                    )
                }
            },
            invalidatesTags: ['Playlist'],
        }),
        deletePlaylist: build.mutation<void, string>({
            query: playlistId => ({
                url: `playlists/${playlistId}`,
                method: 'delete',
            }),
            invalidatesTags: ['Playlist'],
        }),
        // Playlists' cover
        uploadPlaylistCover: build.mutation<
            Images,
            { playlistId: string; file: File }
        >({
            query: ({ playlistId, file }) => {
                const formData = new FormData()
                formData.append('file', file)

                return {
                    url: `playlists/${playlistId}/images/main`,
                    method: 'post',
                    body: formData,
                }
            },
            invalidatesTags: ['Playlist'],
        }),
        deletePlaylistCover: build.mutation<void, string>({
            query: playlistId => ({
                url: `playlists/${playlistId}/images/main`,
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
    useUploadPlaylistCoverMutation,
    useDeletePlaylistCoverMutation,
} = playlistsApi
