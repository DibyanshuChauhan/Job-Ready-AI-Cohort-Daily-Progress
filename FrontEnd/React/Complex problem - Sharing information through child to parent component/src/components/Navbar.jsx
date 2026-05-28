import { useState } from "react"

const Navbar = ({ theme, setTheme, changeTheme }) => {

    const [newTheme, setNewTheme] = useState('')

    return (
        <div className="flex flex-col items-center gap-4 bg-cyan-400 min-h-screen w-full">
            <div className="flex gap-20">
                <h1 className="font-semibold text-4xl m-8 underline font-serif hover:text-blue-600 cursor-pointer">Theme is: {theme}</h1>
                <button onClick={() => setTheme('dark')} className="p-4 bg-amber-500 text-2xl rounded-4xl mt-2 active:scale-95 cursor-pointer hover:bg-amber-600">Change Theme</button>
            </div>
            
            <form onSubmit={(e) => {
                e.preventDefault()
                changeTheme(newTheme)
                setNewTheme('')
            }}
                className="flex inline-block">
                <input value={newTheme} onChange={(e) => setNewTheme(e.target.value)}
                    className="border font-semibold ml-8 mt-5 capitalize text-2xl" type="text" placeholder="Enter Theme..." />

                <button className="mt-5 text-2xl bg-red-700 px-7 py-4 rounded-3xl ml-10 cursor-pointer active:scale-95 hover:bg-red-500" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Navbar