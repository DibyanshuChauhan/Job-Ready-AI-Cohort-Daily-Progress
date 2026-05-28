import { useState } from "react"
import Navbar from "./components/Navbar"

const App = () => {

  const [theme, setTheme] = useState('light')

  const changeTheme = (newTheme) => {
    setTheme(newTheme)
  }

  return (
    <div>
      <Navbar theme={theme} setTheme={setTheme} changeTheme={changeTheme} />

    </div>
  )
}

export default App