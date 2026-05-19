import { useFetchTracksInfiniteQuery } from '@/features/tracks/api/trackApi.ts'
import { useInfiniteScroll } from '@/common/hooks'
import { TracksList } from '@/features/tracks/ui/TracksList'
import { LoadingTrigger } from '@/features/tracks/ui/LoadingTrigger'

export const TracksPage = () => {
    const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
        useFetchTracksInfiniteQuery()

    const { observerRef } = useInfiniteScroll({
        fetchNextPage,
        hasNextPage,
        isFetching,
    })

    const pages = data?.pages.flatMap(page => page.data) || []

    return (
        <div>
            <h1>TracksPage</h1>
            <TracksList tracks={pages} />
            {hasNextPage && (
                <LoadingTrigger
                    observerRef={observerRef}
                    isFetchingNextPage={isFetchingNextPage}
                />
            )}

            {!hasNextPage && pages.length > 0 && <p>Nothing more to load</p>}
        </div>
    )
}
