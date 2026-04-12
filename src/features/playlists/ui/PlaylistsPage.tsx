import { type ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDebounceValue } from '@/common/hooks'
import { Pagination } from '@/common/components'
import {
    useDeletePlaylistMutation,
    useFetchPlaylistsQuery,
} from '@/features/playlists/api/playlistsApi.ts'
import type {
    PlaylistData,
    UpdatePlaylistArgs,
} from '@/features/playlists/api/playlistsApi.types.ts'
import { CreatePlaylistForm } from '@/features/playlists/ui/CreatePlaylistForm'
import { PlaylistItem } from '@/features/playlists/ui/PlaylistItem'
import { EditPlaylistForm } from '@/features/playlists/ui/EditPlaylistForm'

import s from './PlaylistPage.module.scss'

export const PlaylistsPage = () => {
    const [playlistId, setPlaylistId] = useState<string | null>(null)
    const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>()

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

    const [deletePlaylist] = useDeletePlaylistMutation()

    const deletePlaylistHandler = (playlistId: string) => {
        if (window.confirm('Are you sure you want to delete this playlist?')) {
            deletePlaylist(playlistId)
        }
    }

    const editPlaylistHandler = (playlist: PlaylistData | null) => {
        if (playlist) {
            setPlaylistId(playlist.id)
            reset({
                title: playlist.attributes.title,
                description: playlist.attributes.description,
                tagIds: playlist.attributes.tags.map(t => t.id),
            })
        } else {
            setPlaylistId(null)
        }
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
            <div className={s.items}>
                {!data?.data.length && !isLoading && (
                    <h2>Playlists not found</h2>
                )}
                {data?.data.map(playlist => {
                    const isEditing = playlistId === playlist.id

                    return (
                        <div className={s.item} key={playlist.id}>
                            {isEditing ? (
                                <EditPlaylistForm
                                    playlistId={playlistId}
                                    register={register}
                                    handleSubmit={handleSubmit}
                                    setPlaylistId={setPlaylistId}
                                    editPlaylist={editPlaylistHandler}
                                />
                            ) : (
                                <PlaylistItem
                                    playlist={playlist}
                                    editPlaylistHandler={editPlaylistHandler}
                                    deletePlaylistHandler={
                                        deletePlaylistHandler
                                    }
                                />
                            )}
                        </div>
                    )
                })}
            </div>
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
