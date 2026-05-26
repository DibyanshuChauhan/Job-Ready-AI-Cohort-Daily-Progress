import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [userData, setUserData] = useState("Loading...");
  const [number, setNumber] = useState(1);

  const getData = async () => {
    try {
      const response = await axios.get("https://randomuser.me/api/");
      const user = response.data.results[0];
      setUserData(`${user.name.first} ${user.name.last}`);
    } catch (error) {
      console.error("Error fetching data:", error);
      setUserData("Failed to load user");
    }
  };

  useEffect(() => {
    getData();
  }, [number]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white p-6 rounded shadow text-center w-80">
        <h1 className="text-2xl font-bold mb-4">Random User</h1>

        <h2 className="text-lg mb-4">{userData}</h2>

        <h3 className="mb-4">Count: {number}</h3>

        <button
          onClick={() => setNumber((prev) => prev + 1)}
          className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600"
        >
          Change User
        </button>
      </div>
    </div>
  );
};

export default App;