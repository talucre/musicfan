import ArrowLeftIcon from '@/assets/icons/arrow-left.svg?react'
import ArrowRightIcon from '@/assets/icons/arrow-right.svg?react'

import s from './PaginationControls.module.scss'

type Props = {
    pages: (number | '...')[]
    setCurrentPage: (page: number) => void
    currentPage: number
}

export const PaginationControls = ({
    pages,
    currentPage,
    setCurrentPage,
}: Props) => {
    const lastPage = pages[3]

    return (
        <div className={s.pagination}>
            <button
                className={
                    currentPage === 1
                        ? `${s.pageButton} ${s.notActive}`
                        : s.pageButton
                }
                onClick={() =>
                    currentPage !== 1 && setCurrentPage(currentPage - 1)
                }
                type="button"
                disabled={currentPage === 1}
            >
                <ArrowLeftIcon />
            </button>
            {pages.map((page, idx) =>
                page === '...' ? (
                    <button
                        className={`${s.pageButton} ${s.ellipsis}`}
                        key={`ellipsis-${idx}`}
                        type="button"
                        disabled
                    >
                        ...
                    </button>
                ) : (
                    <button
                        key={page}
                        className={
                            page === currentPage
                                ? `${s.pageButton} ${s.pageButtonActive}`
                                : s.pageButton
                        }
                        onClick={() =>
                            page !== currentPage && setCurrentPage(Number(page))
                        }
                        type="button"
                        disabled={page === currentPage}
                    >
                        {page}
                    </button>
                ),
            )}
            <button
                className={
                    currentPage === lastPage
                        ? `${s.pageButton} ${s.notActive}`
                        : s.pageButton
                }
                onClick={() =>
                    currentPage !== lastPage && setCurrentPage(currentPage + 1)
                }
                type="button"
                disabled={currentPage === lastPage}
            >
                <ArrowRightIcon />
            </button>
        </div>
    )
}
