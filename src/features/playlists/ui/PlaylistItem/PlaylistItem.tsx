import type { ChangeEvent } from 'react'
import type { PlaylistData } from '@/features/playlists/api/playlistsApi.types.ts'
import defaultCover from '@/assets/images/default-playlist-cover.png'
import s from './PlaylistItem.module.scss'
import { useUploadPlaylistCoverMutation } from '@/features/playlists/api/playlistsApi.ts'

type Props = {
    playlist: PlaylistData
    editPlaylistHandler: (playlist: PlaylistData) => void
    deletePlaylistHandler: (playlistId: string) => void
}

export const PlaylistItem = ({
    playlist,
    editPlaylistHandler,
    deletePlaylistHandler,
}: Props) => {
    const [uploadPlaylistCover, { isLoading }] =
        useUploadPlaylistCoverMutation()

    const originalCover = playlist.attributes.images.main.find(
        img => img.type === 'original',
    )
    const src = originalCover ? originalCover.url : defaultCover

    const uploadCoverHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.length && event.target.files[0]
        if (!file) return
        uploadPlaylistCover({ playlistId: playlist.id, file })
    }

    return (
        <div>
            <img src={src} alt="cover" width={'240px'} className={s.cover} />
            <input
                type="file"
                onChange={uploadCoverHandler}
                disabled={isLoading}
            />
            <div>title: {playlist.attributes.title}</div>
            <div>description: {playlist.attributes.description}</div>
            <div>userName: {playlist.attributes.user.name}</div>
            <button onClick={() => editPlaylistHandler(playlist)}>
                update
            </button>
            <button onClick={() => deletePlaylistHandler(playlist.id)}>
                delete
            </button>
        </div>
    )
}
