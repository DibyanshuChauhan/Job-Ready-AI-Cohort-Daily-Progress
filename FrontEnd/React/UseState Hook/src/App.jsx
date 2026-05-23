import { useState } from "react";

const App = () => {

  const [marks, setmarks] = useState([60, 55, 89, 15, 29])

  const graceMarks = () => {
    const newMarks = marks.map((elem) => {
      return elem + 5;
    })
    setmarks(newMarks);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {
        marks.map((elem, idx) => {
          return <h1 key={idx}>Marks of the Student {idx + 1} is:  {elem}  {elem > 33 ? "PASS" : "FAIL"} </h1>
        })
      }
      <button onClick={graceMarks} className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded cursor-pointer mt-2 active:scale-95">Give them Grace Marks</button>
    </div>
  );
};

export default App;
