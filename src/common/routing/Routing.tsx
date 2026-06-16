import { Route, Routes } from 'react-router'

import { MainPage } from '@/app/ui'
import { OAuthCallback, ProfilePage } from '@/features/auth'
import { PlaylistsPage } from '@/features/playlists'
import { TracksPage } from '@/features/tracks'
import { PageNotFound } from '@/common/components'

import { Path } from './Path'
import { Layout } from '@/common/components'

export const Routing = () => (
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route path={Path.Main} element={<MainPage />} />
            <Route path={Path.Profile} element={<ProfilePage />} />
            <Route path={Path.Playlists} element={<PlaylistsPage />} />
            <Route path={Path.Tracks} element={<TracksPage />} />
            <Route path={Path.OAuthRedirect} element={<OAuthCallback />} />
            <Route path={Path.NotFound} element={<PageNotFound />} />
        </Route>
    </Routes>
)
