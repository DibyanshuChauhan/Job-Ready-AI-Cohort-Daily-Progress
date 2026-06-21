import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import "../styles/form.scss"
import { useAuth } from "../hooks/useAuth"

const Login = () => {

    const { loading, handleLogin } = useAuth()

    const [username, setName] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await handleLogin(username.trim(), password)
        navigate("/")
    }

    if (loading) {
        return (
            <main>
                <h1>Loading.....</h1>
            </main>
        )
    }

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input
                        required
                        value={username}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        name="username"
                        placeholder="Enter username" />

                    <input
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                        placeholder="Enter password" />

                    <button className="button primary-button" type="submit">Login</button>

                </form>

                <p>Don't have an account ? <Link to="/register">Register</Link> </p>

            </div>
        </main>
    )
}

export default Login