const Card = ({ item }) => {
    return (
        <div className="w-80 bg-white rounded-lg shadow-md p-5 hover:shadow-xl transition">
            <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
            <p className="text-gray-500 mb-3">@{item.username}</p>

            <div className="text-left space-y-2">
                <p>
                    <strong>Email:</strong> {item.email}
                </p>

                <p>
                    <strong>Phone:</strong> {item.phone}
                </p>

                <p>
                    <strong>Website:</strong>{" "}
                    <a
                        href={`https://${item.website}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        {item.website}
                    </a>
                </p>
            </div>

            <hr className="my-4" />

            <div className="text-left">
                <h3 className="font-semibold">Address</h3>
                <p>
                    {item.address.suite}, {item.address.street}
                </p>
                <p>
                    {item.address.city}, {item.address.zipcode}
                </p>
            </div>

            <hr className="my-4" />

            <div className="text-left">
                <h3 className="font-semibold">Company</h3>
                <p>{item.company.name}</p>
                <p className="text-gray-500 italic">{item.company.catchPhrase}</p>
            </div>
        </div>
    );
};

export default Card;