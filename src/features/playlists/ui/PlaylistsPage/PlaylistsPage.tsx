import { type ChangeEvent, useState } from 'react'

import { useFetchPlaylistsQuery } from '@/features/playlists/api/playlistsApi.ts'

import { useDebounceValue } from '@/common/hooks'
import { Pagination } from '@/common/components'

import { PlaylistList } from '@/features/playlists/ui/PlaylistList'

import s from './PlaylistPage.module.css'
import { Search } from '@/common/components/Search'

export const PlaylistsPage = () => {
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(20)

    const debouncedSearch = useDebounceValue(search)
    const { data, isLoading } = useFetchPlaylistsQuery({
        search: debouncedSearch,
        pageNumber: currentPage,
        pageSize,
    })

    const setCurrentPageHandler = (page: number) => {
        setCurrentPage(page)
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        })
    }

    const searchPlaylistHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value)
        setCurrentPage(1)
    }

    const changePageSizeHandler = (size: number) => {
        setPageSize(size)
        setCurrentPage(1)
    }

    if (isLoading)
        return (
            <div className={s.container}>
                <h1>All Playlists</h1>
                <Search
                    placeholder={'Search playlist by title'}
                    value={search}
                    onChange={searchPlaylistHandler}
                />
                <div>Skeleton...</div>
            </div>
        )

    return (
        <div className={s.container}>
            <h1>All Playlists</h1>
            <Search
                placeholder={'Search playlist by title'}
                value={search}
                onChange={searchPlaylistHandler}
            />
            <PlaylistList
                playlists={data?.data || []}
                isPlaylistLoading={isLoading}
            />
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPageHandler}
                pagesCount={data?.meta.pagesCount || 1}
                pageSize={pageSize}
                changePageSize={changePageSizeHandler}
            />
        </div>
    )
}
