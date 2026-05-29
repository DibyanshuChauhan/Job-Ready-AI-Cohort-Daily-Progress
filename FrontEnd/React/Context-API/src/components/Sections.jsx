import { useContext } from "react"
import { UserDataContext } from "../context/UserContext"

const Sections = () => {

    const data = useContext(UserDataContext)

    return (
        <div className="h-90 bg-zinc-600">
            <h1 className="text-2xl">All Sections</h1>
            <p>{data}</p>
        </div>
    )
}

export default Sections