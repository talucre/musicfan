import type { TrackData } from '@/features/tracks/api/trackApi.types.ts'
import s from './TracksList.module.css'

type Props = {
    tracks: TrackData[]
}

export const TracksList = ({ tracks }: Props) => {
    return (
        <div className={s.list}>
            {tracks.map(track => {
                const { title, user, attachments } = track.attributes

                return (
                    <div key={track.id} className={s.item}>
                        <div className={s.textWrapper}>
                            <p className={s.ellipsisText}>Title: {title}</p>
                            <p className={s.ellipsisText}>Name: {user.name}</p>
                        </div>
                        <div className={s.playerBlock}>
                            {attachments.length ? (
                                <audio controls src={attachments[0].url} />
                            ) : (
                                'no file'
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
