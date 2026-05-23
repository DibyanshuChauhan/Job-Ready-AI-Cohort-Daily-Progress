import { useState } from "react";
import Card from "./components/Card";

const App = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    setName('');
    setImage('');
    setRole('');
    setDescription('');

    const oldUsers = [...allUsers];
    oldUsers.push({ name, image, role, description });
    setAllUsers(oldUsers);
    console.log(oldUsers);
  }

  const deleteUser = (index) => {
    const copyUsers = [...allUsers];
    copyUsers.splice(index, 1);
    setAllUsers(copyUsers);
  }

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [role, setRole] = useState('');
  const [description, setDescription] = useState('');

  const [allUsers, setAllUsers] = useState([]);

  return (
    <div className="h-screen bg-black text-white">
      <form
        className="px-2 py-2 flex flex-wrap"
        onSubmit={handleSubmit}>

        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-2 px-5 py-2 rounded m-2 w-[48%] text-xl font-semibold"
          type="text"
          placeholder="Enter your name" />

        <input
          required
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border-2 px-5 py-2 rounded m-2 w-[48%] text-xl font-semibold"
          type="text"
          placeholder="Image URL" />

        <input
          required
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border-2 px-5 py-2 rounded m-2 w-[48%] text-xl font-semibold"
          type="text"
          placeholder="Enter role" />

        <input
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border-2 px-5 py-2 rounded m-2 w-[48%] text-xl font-semibold"
          type="text"
          placeholder="Enter your description" />

        <button
          className="text-white px-5 py-2 rounded m-2 bg-emerald-700 w-[97%] active:scale-95 cursor-pointer" type="submit">Create User</button>
      </form>

      <div className="px-4 py-10 flex flex-wrap">
        {allUsers.map((user, index) => (
          <Card key={index} index={index} user={user} deleteUser={() => deleteUser(index)} />
        ))}
      </div>

    </div>
  )
}

export default App