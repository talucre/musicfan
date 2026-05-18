import { useFetchTracksInfiniteQuery } from '@/features/tracks/api/trackApi.ts'
import s from './TracksPage.module.css'

export const TracksPage = () => {
    const {
        data,
        isLoading,
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useFetchTracksInfiniteQuery()

    const pages = data?.pages.flatMap(page => page.data) || []

    const loadMoreHandler = () => {
        if (hasNextPage && !isFetching) {
            fetchNextPage()
        }
    }

    return (
        <div>
            <h1>TracksPage</h1>
            <div className={s.list}>
                {pages.map(track => {
                    const { title, user, attachments } = track.attributes

                    return (
                        <div key={track.id} className={s.item}>
                            <div>
                                <p>Title: {title}</p>
                                <p>Name: {user.name}</p>
                            </div>
                            <div>
                                {attachments.length ? (
                                    <audio controls src={attachments[0].url} />
                                ) : (
                                    'no file'
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div>
                {!isLoading && (
                    <>
                        {hasNextPage ? (
                            <button
                                onClick={loadMoreHandler}
                                disabled={isFetching}
                            >
                                {isFetchingNextPage
                                    ? 'Loading...'
                                    : 'Load More'}
                            </button>
                        ) : (
                            <p>Nothing more to load</p>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
