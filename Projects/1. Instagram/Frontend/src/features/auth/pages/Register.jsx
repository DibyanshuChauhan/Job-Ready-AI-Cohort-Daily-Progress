import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { useAuth } from "../hooks/useAuth"

const Register = () => {

    const navigate = useNavigate()

    const { loading, handleRegister } = useAuth()

    const [username, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const submitHandle = async (e) => {
        e.preventDefault()

        await handleRegister(username, email, password)
        navigate("/login")
    }

    if (loading) {
        return (
            <main>
                <h1>Loading....</h1>
            </main>
        )
    }

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={(e) => submitHandle(e)}>
                    <input
                        value={username}
                        onChange={(e) => setName(e.target.value)}
                        required
                        type="text"
                        name="username"
                        placeholder="Enter username" />

                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        type="email"
                        name="email"
                        placeholder="Enter your email address" />

                    <input
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                        placeholder="Enter password" />

                    <button className="button primary-button" type="submit">Register</button>

                </form>

                <p>Already have an account ? <Link to="/login">Login</Link> </p>

            </div>
        </main>
    )
}

export default Register