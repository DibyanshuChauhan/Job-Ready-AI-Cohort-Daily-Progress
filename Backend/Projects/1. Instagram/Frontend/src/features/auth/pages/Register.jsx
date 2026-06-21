import { useState } from "react"
import { Link } from "react-router-dom"

const Register = () => {

    const [username, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const submitHandle = (e) => {
        e.preventDefault()
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
                        value={password}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        type="email"
                        name="email"
                        placeholder="Enter your email address" />

                    <input
                        required
                        value={email}
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