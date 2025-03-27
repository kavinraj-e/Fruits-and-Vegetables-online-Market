import React from 'react'

function Service() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="p-6 max-w-6xl w-full space-y-12">
        <h1 className="text-4xl font-bold text-center mb-12 text-green-700">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Fresh Fruits Delivery",
              description:
                "We deliver a variety of fresh fruits including apples, mangoes, bananas, and more, sourced directly from farms.",
              image: "https://images.pexels.com/photos/5945646/pexels-photo-5945646.jpeg" // ✅ New Fresh Fruits Image
            },
            {
              title: "Organic Vegetables",
              description:
                "Our organic vegetables, free from harmful chemicals, ensure a healthy and nutritious diet for you and your family.",
              image: "https://images.pexels.com/photos/1203463/pexels-photo-1203463.jpeg" // ✅ New Organic Vegetables Image
            },
            {
              title: "Seasonal Produce",
              description:
                "Enjoy the best seasonal produce available, including exotic fruits and vegetables that are rich in flavor and freshness.",
              image: "https://images.pexels.com/photos/4197983/pexels-photo-4197983.jpeg" // ✅ New Seasonal Produce Image
            }
          ].map((service, index) => (
            <div
              key={index}
              className="p-6 shadow-xl rounded-2xl bg-white transform hover:scale-105 transition duration-300"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-semibold text-green-600 mb-2">{service.title}</h2>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Service
