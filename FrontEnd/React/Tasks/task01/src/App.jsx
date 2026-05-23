import { useState } from "react";

const App = () => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState(''); // Initialized with empty string to prevent warnings

  const [carddata, setcarddata] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCard = { name, email, phone };

    setcarddata([...carddata, newCard]);

    setname('');
    setemail('');
    setphone('');
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Task 01</h1>

        {/* Form Styling */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto flex flex-col gap-4">
          <input
            required
            type="text"
            placeholder="Enter your name"
            name="name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            required
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            required
            type="number"
            name="phone"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setphone(e.target.value)}
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded transition duration-200"
          >
            Generate Card
          </button>
        </form>

        <hr className="my-8 border-gray-300" />

        {/* Responsive Grid for Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {carddata.map((card, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-xl shadow border border-gray-200 hover:shadow-md transition duration-200"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2 border-gray-100">User Details</h3>
              <p className="text-gray-600 mb-1"><strong className="text-gray-800">Name:</strong> {card.name}</p>
              <p className="text-gray-600 mb-1"><strong className="text-gray-800">Email:</strong> {card.email}</p>
              <p className="text-gray-600"><strong className="text-gray-800">Phone:</strong> {card.phone}</p>
            </div>
          ))}
        </div>

        {/* Fallback text when empty */}
        {carddata.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No cards generated yet. Fill the form above!</p>
        )}
      </div>
    </div>
  )
}

export default App;