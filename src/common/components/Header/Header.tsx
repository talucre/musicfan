import s from './Header.module.css'
import baseStyles from '@/styles.module.css'

export const Header = () => {
    return (
        <header className={s.header}>
            <button className={baseStyles.btn}>Sign up with APIHUB</button>
        </header>
    )
}
