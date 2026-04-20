import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useDeletePlaylistMutation } from '@/features/playlists/api/playlistsApi.ts'
import type {
    PlaylistData,
    UpdatePlaylistArgs,
} from '@/features/playlists/api/playlistsApi.types.ts'

import { EditPlaylistForm } from '@/features/playlists/ui/EditPlaylistForm'
import { PlaylistItem } from '@/features/playlists/ui/PlaylistItem'

import s from './PlaylistList.module.css'

type Props = {
    playlists: PlaylistData[]
    isPlaylistLoading: boolean
}

export const PlaylistList = ({ playlists, isPlaylistLoading }: Props) => {
    const [playlistId, setPlaylistId] = useState<string | null>(null)

    const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>()

    const [deletePlaylist] = useDeletePlaylistMutation()

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
        <div className={s.items}>
            {!playlists.length && !isPlaylistLoading && (
                <h2>Playlists not found</h2>
            )}
            {playlists.map(playlist => {
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
                                deletePlaylistHandler={deletePlaylistHandler}
                            />
                        )}
                    </div>
                )
            })}
        </div>
    )
}
