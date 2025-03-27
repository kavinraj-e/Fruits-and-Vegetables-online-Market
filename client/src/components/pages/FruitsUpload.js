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

  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if ((name === "price" || name === "quantityAvailable") && value < 0) return;

    setFormData({ ...formData, [name]: value });
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
    setIsUploading(true);

    try {
      let imageUrl = formData.imageUrl;
      if (image) {
        imageUrl = await submitImage();
      }

      const updatedFormData = { ...formData, imageUrl };
      await axios.post(`${process.env.REACT_APP_API_URL}/api/product`, updatedFormData);
      toast.success('Product uploaded successfully!');

      setFormData({
        name: '',
        description: '',
        price: '',
        quantityAvailable: '',
        imageUrl: '',
        category: '',
        origin: ''
      });
      setImage(null);
    } catch (error) {
      console.error('Error:', error.message);
      toast.error('Failed to upload product. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Upload Product</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-300">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              min="0"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="quantityAvailable" className="block text-sm font-medium text-gray-300">Quantity Available:</label>
            <input
              type="number"
              id="quantityAvailable"
              name="quantityAvailable"
              min="0"
              value={formData.quantityAvailable}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-300">Category:</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Category</option>
              <option value="fruit">Fruit</option>
              <option value="vegetable">Vegetable</option>
            </select>
          </div>

          <div>
            <label htmlFor="origin" className="block text-sm font-medium text-gray-300">Origin:</label>
            <input
              type="text"
              id="origin"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-300">Upload Image:</label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              className="mt-1 block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            />
          </div>

          <button
            type="submit"
            disabled={isUploading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isUploading ? 'Uploading...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FruitsUpload;