import { useFetchPlaylistsQuery } from '@/features/playlists/api/playlistsApi.ts'
import s from './PlaylistPage.module.scss'
import { CreatePlaylistForm } from '@/features/playlists/ui/PlaylistsPage/CreatePlaylistForm'

export const PlaylistsPage = () => {
    const { data, isLoading } = useFetchPlaylistsQuery()

    if (isLoading) return <h1>Loading</h1>

    return (
        <div className={s.container}>
            <h1>Playlist page</h1>
            <CreatePlaylistForm />
            <div className={s.items}>
                {data?.data.map(playlist => {
                    return (
                        <div className={s.item} key={playlist.id}>
                            <div>title: {playlist.attributes.title}</div>
                            <div>
                                description: {playlist.attributes.description}
                            </div>
                            <div>userName: {playlist.attributes.user.name}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
