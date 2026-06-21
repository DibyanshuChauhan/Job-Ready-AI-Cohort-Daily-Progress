import { useState } from "react"
import "../styles/form.scss"
import { Link } from "react-router-dom"
import axios from "axios"

const Login = () => {

    const [username, setName] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        axios.post("http://localhost:3000/api/auth/login", {
            username, password
        }, {
            withCredentials: true
        })
            .then(res => {
                console.log(res.data)

                setName('')
                setPassword('')
            })
    }

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input
                        required
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        name="username"
                        placeholder="Enter username" />

                    <input
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                        placeholder="Enter password" />

                    <button type="submit">Login</button>
                    <p>Don't have an account <Link className="toggleAuthForm" to="/register">Register</Link> </p>

                </form>
            </div>
        </main>
    )
}

export default Login