export default function ContactPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          Contact <span className="text-blue-600">Us</span>
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-10">
          We’d love to hear from you! Whether you have a question about products, 
          orders, or anything else — our team is ready to answer all your questions.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📍 Get in Touch</h2>
            <ul className="space-y-3 text-gray-600">
              <li><strong>Email:</strong> support@nextshop.com</li>
              <li><strong>Phone:</strong> +92 300 1234567</li>
              <li><strong>Address:</strong> Lahore, Pakistan</li>
            </ul>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">✉️ Send us a Message</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Your Message"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                rows="4"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
