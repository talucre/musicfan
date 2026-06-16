import s from './Header.module.css'
// import baseStyles from '@/styles.module.css'
import { Login, useGetMeQuery, useLogoutMutation } from '@/features/auth'

export const Header = () => {
    const { data } = useGetMeQuery()
    const [logout] = useLogoutMutation()

    return (
        <header className={s.header}>
            {data && (
                <div>
                    {data.login}
                    <button onClick={() => logout()}>logout</button>
                </div>
            )}

            {!data && <Login />}
        </header>
    )
}
