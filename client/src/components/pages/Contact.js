import React from 'react'

function Contact() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-12">
    <h1 className="text-3xl font-bold mb-6">About Fruzoz Fruits</h1>
    <p className="text-gray-700 mb-6">
      Fruzoz Fruits is your trusted online marketplace for fresh fruits and vegetables. 
      We are committed to delivering farm-fresh produce to your doorstep, ensuring quality and freshness with every order. 
      Our goal is to support healthy lifestyles by offering a wide variety of organic and seasonal products.
    </p>

    <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <form className="space-y-4 bg-white p-6 rounded-2xl shadow-lg">
        <input type="text" placeholder="Name" className="w-full p-2 border rounded-md" />
        <input type="email" placeholder="Email" className="w-full p-2 border rounded-md" />
        <textarea placeholder="Your Message" className="w-full p-2 border rounded-md" rows="4" />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-md">Send Message</button>
      </form>

      <div className="space-y-4">
        <p>Email: contact@fruzoz.com</p>
        <p>Phone: +1 (234) 567-890</p>
        <p>Address: 123 Fruzoz Lane, Fresh City</p>
      </div>
    </div>
  </div>
  )
}

export default Contact