import { useState } from "react";

const App = () => {

  const [value, setvalue] = useState('');
  const [users, setUsers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault()

    const newUser = [...users]
    newUser.push(value)
    setUsers(newUser)
    console.log(newUser)

    console.log("Form Submitted")
    setvalue('')
  }

  return (
    <div className="text-3xl font-bold flex items-center justify-center h-screen bg-[#e0e0e0]">
      <form className="p-2.5 bg-[#f0f0f0] rounded-lg flex gap-x-2.5" onSubmit={(e) => {
        handleSubmit(e)
      }}>
        <input value={value} onChange={(e) => setvalue(e.target.value)} required className="uppercase border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Enter Name..." />
        <button className="bg-[#007bff] text-white py-2 px-4 rounded-lg hover:bg-[#0056b3] cursor-pointer active:bg-[#004080] active:scale-95" type="submit">
          Submit
        </button>
      </form>

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Users:</h2>
        <ul className="list-disc list-inside">
          {users.map((user, index) => (
            <li key={index} className="text-gray-700">{user}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App