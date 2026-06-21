import { baseApi } from '@/app/api/baseApi.ts'
import type {
    CreatePlaylistArgs,
    FetchPlaylistsArgs,
    PlaylistCreatedEvent,
    PlaylistUpdatedEvent,
    UpdatePlaylistArgs,
} from './playlistsApi.types.ts'
import {
    playlistCreateResponseSchema,
    playlistsResponseSchema,
} from '@/features/playlists/model/playlists.schemas.ts'
import { withZodCatch } from '@/common/utils'
import { imagesSchema } from '@/common/schemas'
import { SOCKET_EVENTS } from '@/common/constants'
import { subscribeToEvent } from '@/common/socket'

export const playlistsApi = baseApi.injectEndpoints({
    endpoints: build => ({
        fetchPlaylists: build.query({
            query: (params: FetchPlaylistsArgs) => ({
                url: 'playlists',
                params,
            }),
            ...withZodCatch(playlistsResponseSchema),
            keepUnusedDataFor: 0,
            onCacheEntryAdded: async (
                _arg,
                { cacheDataLoaded, updateCachedData, cacheEntryRemoved },
            ) => {
                await cacheDataLoaded

                const unsubscribes = [
                    subscribeToEvent<PlaylistCreatedEvent>(
                        SOCKET_EVENTS.PLAYLIST_CREATED,
                        msg => {
                            const newPlaylist = msg.payload.data
                            updateCachedData(state => {
                                state.data.pop()
                                state.data.unshift(newPlaylist)
                                state.meta.totalCount += 1
                                state.meta.pagesCount = Math.ceil(
                                    state.meta.totalCount / state.meta.pageSize,
                                )
                            })
                        },
                    ),
                    subscribeToEvent<PlaylistUpdatedEvent>(
                        SOCKET_EVENTS.PLAYLIST_UPDATED,
                        msg => {
                            const newPlaylist = msg.payload.data
                            updateCachedData(state => {
                                const index = state.data.findIndex(
                                    playlist => playlist.id === newPlaylist.id,
                                )
                                if (index !== -1) {
                                    state.data[index] = {
                                        ...state.data[index],
                                        ...newPlaylist,
                                    }
                                }
                            })
                        },
                    ),
                ]

                await cacheEntryRemoved
                unsubscribes.forEach(unsubscribe => unsubscribe())
            },
            providesTags: ['Playlist'],
        }),
        createPlaylist: build.mutation({
            query: (attributes: CreatePlaylistArgs) => ({
                url: 'playlists',
                method: 'post',
                body: {
                    data: {
                        type: 'playlists',
                        attributes,
                    },
                },
            }),
            ...withZodCatch(playlistCreateResponseSchema),
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
        uploadPlaylistCover: build.mutation({
            query: ({
                playlistId,
                file,
            }: {
                playlistId: string
                file: File
            }) => {
                const formData = new FormData()
                formData.append('file', file)

                return {
                    url: `playlists/${playlistId}/images/main`,
                    method: 'post',
                    body: formData,
                }
            },
            ...withZodCatch(imagesSchema),
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
