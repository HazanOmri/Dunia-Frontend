import { useSelector } from 'react-redux'

export function Home() {
    const user = useSelector(storeState => storeState.userModule.user)

    return <section className="home">
        <h1>Hello from {user.name}</h1>
    </section>
}