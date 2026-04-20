import { getPaginationPages } from '@/common/utils'

import { PaginationControls } from '@/common/components/Pagination/PaginationControls'
import { PageSizeSelector } from '@/common/components/Pagination/PageSizeSelector'

import s from './Pagination.module.css'

type Props = {
    currentPage: number
    setCurrentPage: (page: number) => void
    pagesCount: number
    pageSize: number
    changePageSize: (size: number) => void
}

export const Pagination = ({
    currentPage,
    setCurrentPage,
    pagesCount,
    pageSize,
    changePageSize,
}: Props) => {
    if (pagesCount <= 1) return null

    const pages = getPaginationPages(currentPage, pagesCount)

    return (
        <div className={s.container}>
            <PaginationControls
                pages={pages}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
            <PageSizeSelector
                pageSize={pageSize}
                changePageSize={changePageSize}
            />
        </div>
    )
}
