import type { PlaylistAttributes } from '@/features/playlists/api/playlistsApi.types.ts'
import s from './PlaylistDescription.module.css'
import { convertDate } from '@/common/utils'

type Props = {
    attributes: PlaylistAttributes
}

export const PlaylistDescription = ({ attributes }: Props) => {
    return (
        <div className={s.description}>
            <div className={s.title}>{attributes.title}</div>
            <div>
                Made by <span className={s.author}>{attributes.user.name}</span>
            </div>
            <div>Tracks 23 • Created {convertDate(attributes.addedAt)}</div>{' '}
            {/*Placeholder because its always zero */}
        </div>
    )
}
