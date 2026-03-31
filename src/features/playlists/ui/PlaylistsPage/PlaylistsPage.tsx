import { useFetchPlaylistsQuery } from '@/features/playlists/api/playlistsApi.ts'

export const PlaylistsPage = () => {
    const data = useFetchPlaylistsQuery({})
    console.log(data)

    return (
        <div>
            <h1>PlaylistsPage</h1>
        </div>
    )
}
