import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const FruitsUpload = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantityAvailable: '',
    imageUrl: '',
    category: '',
    origin: ''
  });

  const [image, setImage] = useState(""); // State for image

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitImage = async () => {
    try {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "FRUXO_PRODUCT");
      data.append("cloud_name", "dei4wuz8e");

      const response = await fetch("https://api.cloudinary.com/v1_1/dei4wuz8e/image/upload", {
        method: "POST",
        body: data
      });

      const responseData = await response.json();

      if (responseData.secure_url) {
        return responseData.secure_url;
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = formData.imageUrl;
      if (image) {
        imageUrl = await submitImage(); // Upload image before form submission
      }

      const updatedFormData = { ...formData, imageUrl };
      const response = await axios.post('http://localhost:8000/api/product', updatedFormData);
      toast.success('Product uploaded successfully!');
      console.log('Response:', response.data);

      // Optionally, you can reset the form after successful submission
      setFormData({
        name: '',
        description: '',
        price: '',
        quantityAvailable: '',
        imageUrl: '',
        category: '',
        origin: ''
      });
      setImage("");
    } catch (error) {
      console.error('Error:', error.message);
      toast.warning('Login First to upload product.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-xl font-semibold mb-6">Upload Product</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="block mb-2 font-semibold">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 mb-4 border rounded-md" required />

        <label htmlFor="description" className="block mb-2 font-semibold">Description:</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="w-full px-4 py-2 mb-4 border rounded-md" required />

        <label htmlFor="price" className="block mb-2 font-semibold">Price:</label>
        <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-2 mb-4 border rounded-md" required />

        <label htmlFor="quantityAvailable" className="block mb-2 font-semibold">Quantity Available:</label>
        <input type="number" id="quantityAvailable" name="quantityAvailable" value={formData.quantityAvailable} onChange={handleChange} className="w-full px-4 py-2 mb-4 border rounded-md" required />

        <label htmlFor="category" className="block mb-2 font-semibold">Category:</label>
        <select id="category" name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 mb-4 border rounded-md" required>
          <option value="">Select Category</option>
          <option value="fruit">Fruit</option>
          <option value="vegetable">Vegetable</option>
        </select>

        <label htmlFor="origin" className="block mb-2 font-semibold">Origin:</label>
        <input type="text" id="origin" name="origin" value={formData.origin} onChange={handleChange} className="w-full px-4 py-2 mb-4 border rounded-md" required />

        <label htmlFor="image" className="block mb-2 font-semibold">Upload Image:</label>
        <input type='file' id="image" onChange={(e) => setImage(e.target.files[0])} className="mb-4" />

        <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md">Submit</button>
      </form>
    </div>
  );
};

export default FruitsUpload;
