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

    // Fetch all products
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Add or Update Product
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await axios.put(`http://localhost:8000/api/farmer/${editId}`, formData);
            } else {
                await axios.post('http://localhost:8000/api/products', formData);
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

    // Edit Product
    const handleEdit = (product) => {
        setFormData(product);
        setEditId(product._id);
    };

    // Delete Product
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/farmer/${id}`);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
                <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
                <input type="number" name="quantityAvailable" placeholder="Quantity" value={formData.quantityAvailable} onChange={handleChange} required />
                <input type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} required />
                <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
                <input type="text" name="origin" placeholder="Origin" value={formData.origin} onChange={handleChange} required />
                <button type="submit">{editId ? 'Update Product' : 'Add Product'}</button>
            </form>

            <h3>Product List</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Image</th>
                        <th>Category</th>
                        <th>Origin</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.quantityAvailable}</td>
                            <td><img src={product.imageUrl} alt={product.name} width="50" /></td>
                            <td>{product.category}</td>
                            <td>{product.origin}</td>
                            <td>
                                <button onClick={() => handleEdit(product)}>Edit</button>
                                <button onClick={() => handleDelete(product._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
