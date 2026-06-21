import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const Register = () => {

    const [username, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const submitHandle = async (e) => {
        e.preventDefault()

        axios.post("http://localhost:3000/api/auth/register", {
            username, email, password
        }, {
            withCredentials: true
        })
            .then((res) => {
                console.log(res.data)

                setName('')
                setPassword('')
                setEmail('')
            })
    }

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={(e) => submitHandle(e)}>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        required
                        type="text"
                        name="username"
                        placeholder="Enter username" />

                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        type="email"
                        name="email"
                        placeholder="Enter your email address" />

                    <input
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                        placeholder="Enter password" />

                    <button type="submit">Register</button>
                    <p>Already have an account ? <Link className="toggleAuthForm" to="/login">Login</Link> </p>

                </form>
            </div>
        </main>
    )
}

export default Register