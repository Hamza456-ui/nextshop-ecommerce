export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          About <span className="text-blue-600">NextShop</span>
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto leading-relaxed mb-12">
          At <span className="font-semibold">NextShop</span>, we’re more than just an e-commerce platform – 
          we’re a community of passionate shoppers and trusted sellers. Our goal is to bring you 
          quality products, seamless shopping, and exceptional customer experiences.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
            <h2 className="text-xl font-bold text-gray-800 mb-2">🌟 Our Mission</h2>
            <p className="text-gray-600">
              To make online shopping simple, secure, and enjoyable for everyone across Pakistan.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
            <h2 className="text-xl font-bold text-gray-800 mb-2">🚀 Our Vision</h2>
            <p className="text-gray-600">
              To become the leading e-commerce platform by offering innovation, 
              affordability, and trust to all customers.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
            <h2 className="text-xl font-bold text-gray-800 mb-2">🤝 Our Values</h2>
            <p className="text-gray-600">
              Integrity, quality, and customer satisfaction drive everything we do at NextShop.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
