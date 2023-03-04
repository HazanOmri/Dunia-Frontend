import { Link } from "react-router-dom";

export function AppHeader() {
    return <section className="app-header">
        <h1>AppHeader</h1>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
        </nav>
    </section>
}