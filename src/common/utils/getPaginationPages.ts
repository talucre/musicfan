const SIBLING_COUNT = 1

export const getPaginationPages = (
    currentPage: number,
    pagesCount: number,
): (number | '...')[] => {
    if (pagesCount <= 1) return []

    const pages: (number | '...')[] = []

    // Границы диапозона вокруг текущей страницы
    const leftSibling = Math.max(2, currentPage - SIBLING_COUNT)
    const rightSibling = Math.min(pagesCount - 1, currentPage + SIBLING_COUNT)

    // Всегда показываем первую страницу
    pages.push(1)

    if (leftSibling > 2) {
        pages.push('...')
    }

    // Соседние страницы вокруг текущей страницы
    for (let page = leftSibling; page <= rightSibling; page++) {
        pages.push(page)
    }

    // Многоточие справа
    if (rightSibling < pagesCount - 1) {
        pages.push('...')
    }

    // Всегда показываем последнюю страницу (если их больше одной)
    if (pagesCount > 1) {
        pages.push(pagesCount)
    }

    return pages
}
