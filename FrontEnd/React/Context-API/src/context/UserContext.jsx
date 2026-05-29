import { createContext } from "react"

// eslint-disable-next-line react-refresh/only-export-components
export const UserDataContext = createContext()

const UserContext = ({ children }) => {

    const user = 'Divyanshu'

    return (

        <UserDataContext.Provider value={user}>
            {children}
        </UserDataContext.Provider>

    )
}

export default UserContext