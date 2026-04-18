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
    return (
        <div className={s.pagination}>
            {pages.map((page, idx) =>
                page === '...' ? (
                    <button
                        disabled
                        className={`${s.pageButton} ${s.ellipsis}`}
                        key={`ellipsis-${idx}`}
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
                        disabled={page === currentPage}
                        type="button"
                    >
                        {page}
                    </button>
                ),
            )}
        </div>
    )
}
