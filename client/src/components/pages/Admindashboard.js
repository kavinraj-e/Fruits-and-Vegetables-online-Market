import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        quantityAvailable: '',
        imageUrl: '',
        category: '',
        origin: ''
    });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await axios.put(`${process.env.REACT_APP_API_URL}/api/farmer/${editId}`, formData);
            } else {
                await axios.post(`${process.env.REACT_APP_API_URL}/api/products`, formData);
            }
            fetchProducts();
            setFormData({
                name: '',
                description: '',
                price: '',
                quantityAvailable: '',
                imageUrl: '',
                category: '',
                origin: ''
            });
            setEditId(null);
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    const handleEdit = (product) => {
        setFormData(product);
        setEditId(product._id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/farmer/${id}`);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-8">
            <h2 className="text-3xl font-bold text-center text-purple-800 mb-8">Admin Dashboard</h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />
                    <input
                        type="number"
                        name="quantityAvailable"
                        placeholder="Quantity"
                        value={formData.quantityAvailable}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />
                    <input
                        type="text"
                        name="imageUrl"
                        placeholder="Image URL"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />
                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={formData.category}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />
                    <input
                        type="text"
                        name="origin"
                        placeholder="Origin"
                        value={formData.origin}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full mt-4 bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-300"
                >
                    {editId ? 'Update Product' : 'Add Product'}
                </button>
            </form>

            {/* Product List */}
            <h3 className="text-2xl font-semibold text-purple-800 mb-4">Product List</h3>
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="min-w-full">
                    <thead className="bg-purple-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-purple-800">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-purple-800">Description</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-purple-800">Price</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-purple-800">Quantity</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-purple-800">Image</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-purple-800">Category</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-purple-800">Origin</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-purple-800">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {products.map((product) => (
                            <tr key={product._id} className="hover:bg-gray-50 transition duration-200">
                                <td className="px-6 py-4 text-sm text-gray-700">{product.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{product.description}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{product.price}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{product.quantityAvailable}</td>
                                <td className="px-6 py-4">
                                    <img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded-md object-cover" />
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">{product.category}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{product.origin}</td>
                                <td className="px-6 py-4 space-x-2">
                                    <button
                                        onClick={() => handleEdit(product)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;