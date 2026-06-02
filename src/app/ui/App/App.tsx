import { ToastContainer } from 'react-toastify'
import { Routing } from '@/common/routing'
import { useGlobalLoading } from '@/common/hooks'
import { LinearProgress } from '@/common/components'

export const App = () => {
    const isGlobalLoading = useGlobalLoading()

    return (
        <>
            {isGlobalLoading && <LinearProgress />}
            <Routing />
            <ToastContainer />
        </>
    )
}
