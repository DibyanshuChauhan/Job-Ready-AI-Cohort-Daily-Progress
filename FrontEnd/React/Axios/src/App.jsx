import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./components/Card";

const App = () => {
  const [allData, setAllData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setAllData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);}
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">User Directory</h1>

      <div className="flex flex-wrap justify-center gap-5 mt-8">
        {allData.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default App;