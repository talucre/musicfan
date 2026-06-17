import { Navigate } from 'react-router'
import { useGetMeQuery } from '@/features/auth/api/authApi.ts'
import {
    CreatePlaylistForm,
    PlaylistList,
    useFetchPlaylistsQuery,
} from '@/features/playlists'
import { Path } from '@/common/routing'

export const ProfilePage = () => {
    const { data: meResponse, isLoading: isMeLoading } = useGetMeQuery()

    const { data: playlistsResponse, isLoading } = useFetchPlaylistsQuery(
        {
            userId: meResponse?.userId,
        },
        {
            skip: !meResponse?.userId,
        },
    )

    if (isLoading || isMeLoading) {
        return <h1>Loading...</h1>
    }

    if (!isMeLoading && !meResponse) return <Navigate to={Path.Playlists} />

    return (
        <div>
            <h1>{meResponse?.login} page</h1>
            <CreatePlaylistForm />
            <PlaylistList
                playlists={playlistsResponse?.data || []}
                isPlaylistLoading={isLoading || isMeLoading}
            />
        </div>
    )
}
