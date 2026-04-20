import { useGetMeQuery } from '@/features/auth'

export const MainPage = () => {
    const { data } = useGetMeQuery()

    return (
        <div>
            <h1>MainPage</h1>
            <div>login: {data?.login}</div>
        </div>
    )
}
