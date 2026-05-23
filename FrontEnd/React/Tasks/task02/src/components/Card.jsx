const Card = ({ user, index }) => {
    return (
        <div key={index} className="lg:w-[23vw] md:w-[45vw] bg-white rounded-xl m-2 text-black p-8 text-center flex flex-col items-center ">
            <img className="h-20 w-20 rounded-full object-cover object-center" src={user.image} alt={user.name} />

            <h1 className="text-2xl font-semibold mt-2">{user.name}</h1>
            <h5 className="text-lg text-blue-500 font-semibold my-3">{user.role}</h5>
            <p className="text-sm font-medium leading-tight">{user.description}</p>
            <button onClick={() => user.deleteUser(index)   } className="text-white px-5 py-2 rounded m-2 bg-red-500 w-full active:scale-95 cursor-pointer" type="submit">Remove</button>

        </div>
    )
}

export default Card