import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  // States
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);

  // Helper Function
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setEditingNoteId(null);
  };

  // Get All Notes
  const getNotes = async () => {
    try {
      const { data } = await axios.get(
        "https://job-ready-ai-cohort-daily-progress-1.onrender.com/api/notes"
      );

      setNotes(data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  // Create Note
  const createNote = async () => {
    try {
      await axios.post(
        "https://job-ready-ai-cohort-daily-progress-1.onrender.com/api/notes",
        {
          title,
          description,
        }
      );

      getNotes();
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  // Update Note
  const updateNote = async () => {
    try {
      await axios.patch(
        `https://job-ready-ai-cohort-daily-progress-1.onrender.com/api/notes/${editingNoteId}`,
        {
          title,
          description,
        }
      );

      getNotes();
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Note
  const deleteNote = async (noteId) => {
    try {
      await axios.delete(
        `https://job-ready-ai-cohort-daily-progress-1.onrender.com/api/notes/${noteId}`
      );

      getNotes();
    } catch (error) {
      console.log(error);
    }
  };

  // Edit Note
  const handleEditNote = (note) => {
    setTitle(note.title);
    setDescription(note.description);
    setEditingNoteId(note._id);
  };

  // Form Submit
  const submitHandler = (e) => {
    e.preventDefault();

    if (editingNoteId) {
      updateNote();
    } else {
      createNote();
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      await getNotes();
    };

    fetchNotes();
  }, []);

  return (
    <>
      <form
        onSubmit={submitHandler}
        className="note-create-form"
      >
        <input
          required
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          required
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button>
          {editingNoteId
            ? "Update Note"
            : "Create Note"}
        </button>
      </form>

      <div className="notes">
        {notes.map((note) => (
          <div
            key={note._id}
            className="note"
          >
            <h2>{note.title}</h2>

            <p>{note.description}</p>

            <div className="btn">
              <button
                type="button"
                className="btn1"
                onClick={() =>
                  deleteNote(note._id)
                }
              >
                Delete
              </button>

              <button
                type="button"
                className="btn2"
                onClick={() =>
                  handleEditNote(note)
                }
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;