import type { ChangeEvent } from 'react'
import type { Images } from '@/common/types'
import {
    useDeletePlaylistCoverMutation,
    useUploadPlaylistCoverMutation,
} from '@/features/playlists/api/playlistsApi.ts'
import defaultCover from '@/assets/images/default-playlist-cover.png'
import s from './PlaylistCover.module.css'
import { toast } from 'react-toastify'

type Props = {
    playlistId: string
    images: Images
}

export const PlaylistCover = ({ playlistId, images }: Props) => {
    const [uploadPlaylistCover, { isLoading }] =
        useUploadPlaylistCoverMutation()
    const [deletePlaylistCover] = useDeletePlaylistCoverMutation()

    const originalCover = images.main.find(img => img.type === 'original')
    const src = originalCover ? originalCover.url : defaultCover

    const uploadCoverHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
        const maxSize = 1024 * 1024 // 1 MB

        const file = event.target.files?.length && event.target.files[0]
        if (!file) return

        if (!allowedTypes.includes(file.type)) {
            toast('Only JPEG, PNG or GIF images are allowed', {
                type: 'error',
                theme: 'colored',
            })
            return
        }

        if (file.size > maxSize) {
            toast(
                `The file is too large. Max size is ${Math.round(maxSize / 1024)} KB`,
                { type: 'error', theme: 'colored' },
            )
            return
        }

        uploadPlaylistCover({ playlistId, file })
    }

    const deleteCoverHandler = () => deletePlaylistCover(playlistId)

    return (
        <>
            <img src={src} alt="cover" width={'240px'} className={s.cover} />
            <input
                type="file"
                accept={'image/jpeg,image/png,image/gif'}
                onChange={uploadCoverHandler}
                disabled={isLoading}
            />
            {originalCover && (
                <button onClick={deleteCoverHandler}>delete cover</button>
            )}
        </>
    )
}
