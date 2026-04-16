import s from './Header.module.scss'
import baseStyles from '@/styles.module.scss'

export const Header = () => {
    return (
        <header className={s.header}>
            <button className={baseStyles.btn}>Sign up with APIHUB</button>
        </header>
    )
}
