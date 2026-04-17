import { NavLink } from 'react-router'
import { Path } from '@/common/routing'

import { Divider } from '@/common/components/Divider/Divider.tsx'

import HomeIcon from '@/assets/icons/home.svg?react'
import LibraryMusicIcon from '@/assets/icons/library-music.svg?react'
import AddCircleIcon from '@/assets/icons/add-circle.svg?react'
import FileUploadIcon from '@/assets/icons/file-upload.svg?react'
import MusicNoteIcon from '@/assets/icons/music-note.svg?react'
import MusicVideoIcon from '@/assets/icons/music-video.svg?react'

import s from './Navbar.module.scss'

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
                    <HomeIcon />
                    Home
                </NavLink>
                <NavLink
                    to={Path.Profile}
                    className={({ isActive }) =>
                        isActive ? `${s.activeLink}` : `${s.link}`
                    }
                >
                    <LibraryMusicIcon />
                    Your Library
                </NavLink>
                <Divider />
                <button className={s.link}>
                    <AddCircleIcon />
                    Create Playlist
                </button>
                <button className={s.link}>
                    <FileUploadIcon />
                    Upload Track
                </button>
                <Divider />
                <NavLink
                    to={Path.Tracks}
                    className={({ isActive }) =>
                        isActive ? `${s.activeLink}` : `${s.link}`
                    }
                >
                    <MusicNoteIcon />
                    All Tracks
                </NavLink>
                <NavLink
                    to={Path.Playlists}
                    className={({ isActive }) =>
                        isActive ? `${s.activeLink}` : `${s.link}`
                    }
                >
                    <MusicVideoIcon />
                    All Playlists
                </NavLink>
            </div>
        </nav>
    )
}
