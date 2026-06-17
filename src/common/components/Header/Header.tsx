import s from './Header.module.css'
// import baseStyles from '@/styles.module.css'
import { Login, useGetMeQuery, useLogoutMutation } from '@/features/auth'
import { Link } from 'react-router'
import { Path } from '@/common/routing'

export const Header = () => {
    const { data } = useGetMeQuery()
    const [logout] = useLogoutMutation()

    return (
        <header className={s.header}>
            {data && (
                <div>
                    <Link to={Path.Profile}>{data.login}</Link>

                    <button onClick={() => logout()}>logout</button>
                </div>
            )}

            {!data && <Login />}
        </header>
    )
}
