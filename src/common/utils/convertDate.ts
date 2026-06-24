const minute = 60 * 1000
const hour = minute * 60
const day = hour * 24
const week = day * 7
const month = day * 30
const year = day * 365

const months: Record<number, string> = {
    0: 'january',
    1: 'february',
    2: 'march',
    3: 'april',
    4: 'may',
    5: 'june',
    6: 'july',
    7: 'august',
    8: 'september',
    9: 'october',
    10: 'november',
    11: 'december',
}

export const convertDate = (date: string): string => {
    const diff = Date.now() - Date.parse(date)

    if (diff < minute) return 'right now'

    if (diff < hour) return `${Math.floor(diff / 1000 / 60)} minutes ago`

    if (diff < day) return `${Math.floor(diff / 1000 / 60 / 60)} hours ago`

    if (diff < week) {
        return `${Math.floor(diff / 1000 / 60 / 60 / 24)} days ago`
    }

    if (diff < month) {
        return `${Math.floor(diff / 1000 / 60 / 60 / 24 / 30)} months ago`
    }
    const convertedDate = new Date(date)
    if (diff < year) {
        return `${convertedDate.getDate()} ${months[convertedDate.getMonth()]}`
    }

    return `${convertedDate.getDate()} ${months[convertedDate.getMonth()]} ${convertedDate.getFullYear()}`
}
