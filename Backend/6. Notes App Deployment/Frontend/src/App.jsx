import { useEffect, useState } from "react";
import axios from "axios"

const App = () => {
  const [notes, setNotes] = useState([]);

  const getNotes = () => {
    axios.get('http://localhost:3000/api/notes')
      .then(({ data }) => {
        setNotes(data.notes)
      })
  }

  console.log("Hello")

  useEffect(() => {
    getNotes()
  }, [])

  return (
    <>
      <div className="notes">
        {
          notes.map((note, idx) => (
            <div key={idx} className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
            </div>
          ))
        }
      </div>
    </>
  )
};

export default App;
