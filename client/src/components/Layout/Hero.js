import React from 'react'

function Hero() {
  return (
    <div
      className="h-screen w-full bg-cover bg-center flex flex-col justify-center items-center text-white relative"
      style={{
        backgroundImage:
          "url('https://images7.alphacoders.com/127/thumb-1920-1274685.jpg')"
      }}
    >
      {/* Light Shadow Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content Section */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          "Freshness You Can Taste!"
        </h1>
        <p className="text-lg md:text-2xl mb-6 drop-shadow-lg">
          Eat Healthy, Stay Healthy – Grab Your Favorites Now!
        </p>
        <a
          href="/home"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg"
        >
          Explore Now
        </a>
      </div>
    </div>
  )
}

export default Hero
