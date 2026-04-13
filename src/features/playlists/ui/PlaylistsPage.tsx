import { type ChangeEvent, useState } from 'react'

import { useFetchPlaylistsQuery } from '@/features/playlists/api/playlistsApi.ts'

import { useDebounceValue } from '@/common/hooks'
import { Pagination } from '@/common/components'

import { CreatePlaylistForm } from '@/features/playlists/ui/CreatePlaylistForm'
import { PlaylistList } from '@/features/playlists/ui/PlaylistList'

import s from './PlaylistPage.module.scss'

export const PlaylistsPage = () => {
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(8)

    const debouncedSearch = useDebounceValue(search)
    const { data, isLoading } = useFetchPlaylistsQuery({
        search: debouncedSearch,
        pageNumber: currentPage,
        pageSize,
    })

    const searchPlaylistHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value)
        setCurrentPage(1)
    }

    const changePageSizeHandler = (size: number) => {
        setPageSize(size)
        setCurrentPage(1)
    }

    return (
        <div className={s.container}>
            <h1>Playlists page</h1>
            <CreatePlaylistForm />
            <input
                type="search"
                placeholder="Search playlist by title"
                value={search}
                onChange={searchPlaylistHandler}
            />
            <PlaylistList
                playlists={data?.data || []}
                isPlaylistLoading={isLoading}
            />
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pagesCount={data?.meta.pagesCount || 1}
                pageSize={pageSize}
                changePageSize={changePageSizeHandler}
            />
        </div>
    )
}
