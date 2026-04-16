import { Outlet } from 'react-router'
import { Header } from '@/common/components'
import { Navbar } from '@/common/components/Navbar/Navbar.tsx'

import s from './Layout.module.scss'

export const Layout = () => {
    return (
        <div className={s.layout}>
            <Navbar />
            <Header />

            <main className={s.main}>
                <Outlet />
            </main>
        </div>
    )
}
