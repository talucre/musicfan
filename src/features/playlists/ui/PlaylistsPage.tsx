import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CreatePlaylistForm } from '@/features/playlists/ui/CreatePlaylistForm'
import { PlaylistItem } from '@/features/playlists/ui/PlaylistItem'
import { EditPlaylistForm } from '@/features/playlists/ui/EditPlaylistForm'
import {
    useDeletePlaylistMutation,
    useFetchPlaylistsQuery,
} from '@/features/playlists/api/playlistsApi.ts'
import type {
    PlaylistData,
    UpdatePlaylistArgs,
} from '@/features/playlists/api/playlistsApi.types.ts'
import s from './PlaylistPage.module.scss'

export const PlaylistsPage = () => {
    const [playlistId, setPlaylistId] = useState<string | null>(null)

    const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>()

    const { data, isLoading } = useFetchPlaylistsQuery()
    const [deletePlaylist] = useDeletePlaylistMutation()

    if (isLoading) return <h1>Loading</h1>

    const deletePlaylistHandler = (playlistId: string) => {
        if (window.confirm('Are you sure you want to delete this playlist?')) {
            deletePlaylist(playlistId)
        }
    }

    const editPlaylistHandler = (playlist: PlaylistData | null) => {
        if (playlist) {
            setPlaylistId(playlist.id)
            reset({
                title: playlist.attributes.title,
                description: playlist.attributes.description,
                tagIds: playlist.attributes.tags.map(t => t.id),
            })
        } else {
            setPlaylistId(null)
        }
    }

    return (
        <div className={s.container}>
            <h1>Playlist page</h1>
            <CreatePlaylistForm />
            <div className={s.items}>
                {data?.data.map(playlist => {
                    const isEditing = playlistId === playlist.id

                    return (
                        <div className={s.item} key={playlist.id}>
                            {isEditing ? (
                                <EditPlaylistForm
                                    playlistId={playlistId}
                                    register={register}
                                    handleSubmit={handleSubmit}
                                    setPlaylistId={setPlaylistId}
                                    editPlaylist={editPlaylistHandler}
                                />
                            ) : (
                                <PlaylistItem
                                    playlist={playlist}
                                    editPlaylistHandler={editPlaylistHandler}
                                    deletePlaylistHandler={
                                        deletePlaylistHandler
                                    }
                                />
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
