import type { RootState } from '@/app/model/store.ts'
import { useSelector } from 'react-redux'
import { playlistsApi } from '@/features/playlists/api/playlistsApi.ts'
import { tracksApi } from '@/features/tracks/api/tracksApi.ts'

const excludedEndpoints = [
    playlistsApi.endpoints.fetchPlaylists.name,
    tracksApi.endpoints.fetchTracks.name,
]

export const useGlobalLoading = () => {
    return useSelector((state: RootState) => {
        const queries = Object.values(state.baseApi.queries || {})
        const mutations = Object.values(state.baseApi.mutations || {})

        // при первой загрузке будет собственный skeleton
        // поэтому не показываем loader для лучшего UI/UX
        // если есть завершенные запросы, значит мы уже
        // используем пагинацию или инфинити скролл
        // и показываем loader
        const hasActiveQueries = queries.some(query => {
            if (query?.status !== 'pending') return
            if (excludedEndpoints.includes(query.endpointName)) {
                const completedQueries = queries.filter(
                    q => q?.status === 'fulfilled',
                )
                return completedQueries.length > 0
            }
        })

        const hasActiveMutations = mutations.some(
            mutation => mutation?.status === 'pending',
        )

        return hasActiveQueries || hasActiveMutations
    })
}
