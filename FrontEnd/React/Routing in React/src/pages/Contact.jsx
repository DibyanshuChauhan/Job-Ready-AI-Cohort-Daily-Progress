const Contact = () => {
    return (
        <div className="bg-gray-100 min-h-screen px-16 py-10">

            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800">
                    Contact Us
                </h1>
                <p className="text-gray-600 mt-3">
                    We’d love to hear from you. Reach out for any questions or support.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-10">

                {/* Contact Form */}
                <div className="bg-white p-8 rounded-xl shadow">
                    <h2 className="text-2xl font-bold mb-6">
                        Send Us a Message
                    </h2>

                    <form className="space-y-5">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none"
                        />

                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none"
                        />

                        <input
                            type="text"
                            placeholder="Subject"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none"
                        />

                        <textarea
                            rows="6"
                            placeholder="Your Message"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none"
                        ></textarea>

                        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                            Send Message
                        </button>
                    </form>
                </div>

                {/* Contact Info */}
                <div className="bg-white p-8 rounded-xl shadow">
                    <h2 className="text-2xl font-bold mb-6">
                        Get in Touch
                    </h2>

                    <div className="space-y-6 text-gray-700">
                        <div>
                            <h3 className="text-lg font-semibold">📍 Address</h3>
                            <p className="mt-2">
                                123 ShopEase Street, New Delhi, India
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold">📞 Phone</h3>
                            <p className="mt-2">
                                +91 98765 43210
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold">✉️ Email</h3>
                            <p className="mt-2">
                                support@shopease.com
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold">🕒 Working Hours</h3>
                            <p className="mt-2">
                                Monday - Saturday: 9:00 AM - 8:00 PM
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Contact;