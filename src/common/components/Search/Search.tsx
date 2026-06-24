import type { ChangeEvent } from 'react'
import SearchIcon from '@/assets/icons/search.svg?react'
import s from './Search.module.css'

type Props = {
    placeholder: string
    value: string | number
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Search = ({ placeholder, value, onChange }: Props) => {
    return (
        <div className={s.search}>
            <input
                type="search"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={s.searchInput}
            />
            <SearchIcon className={s.searchIcon} />
        </div>
    )
}
