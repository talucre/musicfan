import type { PlaylistData } from '@/features/playlists/api/playlistsApi.types.ts'
import { PlaylistCover } from '@/features/playlists/ui/PlaylistItem/PlaylistCover'
import { PlaylistDescription } from '@/features/playlists/ui/PlaylistItem/PlaylistDescription'

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
    return (
        <div>
            <PlaylistCover
                playlistId={playlist.id}
                images={playlist.attributes.images}
            />
            <PlaylistDescription attributes={playlist.attributes} />
            <button onClick={() => editPlaylistHandler(playlist)}>
                update
            </button>
            <button onClick={() => deletePlaylistHandler(playlist.id)}>
                delete
            </button>
        </div>
    )
}
