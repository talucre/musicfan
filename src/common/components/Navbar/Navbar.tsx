import s from './Navbar.module.scss'
import { NavLink } from 'react-router'
import { Path } from '@/common/routing'
import { Divider } from '@/common/components/Divider/Divider.tsx'

export const Navbar = () => {
    return (
        <nav className={s.navbar}>
            <div className={s.container}>
                <NavLink
                    to={Path.Main}
                    className={({ isActive }) =>
                        isActive ? `${s.activeLink}` : `${s.link}`
                    }
                >
                    Home
                </NavLink>
                {/*<NavLink*/}
                {/*    to={Path.Main}*/}
                {/*    className={({ isActive }) =>*/}
                {/*        isActive ? `${s.activeLink}` : `${s.link}`*/}
                {/*    }*/}
                {/*>*/}
                {/*    Your Library*/}
                {/*</NavLink> TODO make your library page*/}
                <Divider />
                <button className={s.link}>Create Playlist</button>
                <button className={s.link}>Upload Track</button>
                <Divider />
                <NavLink
                    to={Path.Tracks}
                    className={({ isActive }) =>
                        isActive ? `${s.activeLink}` : `${s.link}`
                    }
                >
                    All Tracks
                </NavLink>
                <NavLink
                    to={Path.Playlists}
                    className={({ isActive }) =>
                        isActive ? `${s.activeLink}` : `${s.link}`
                    }
                >
                    All Playlists
                </NavLink>
            </div>
        </nav>
    )
}
