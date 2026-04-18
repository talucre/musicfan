import { Route, Routes } from 'react-router'

import { MainPage } from '@/app/ui/MainPage'
import { ProfilePage } from '@/features/auth/ui'
import { PlaylistsPage } from '@/features/playlists/ui'
import { TracksPage } from '@/features/tracks/ui/TracksPage'
import { PageNotFound } from '@/common/components'

import { Path } from './Path'
import { Layout } from '@/common/components/Layout/Layout.tsx'

export const Routing = () => (
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route path={Path.Main} element={<MainPage />} />
            <Route path={Path.Profile} element={<ProfilePage />} />
            <Route path={Path.Playlists} element={<PlaylistsPage />} />
            <Route path={Path.Tracks} element={<TracksPage />} />
            <Route path={Path.NotFound} element={<PageNotFound />} />
        </Route>
    </Routes>
)
