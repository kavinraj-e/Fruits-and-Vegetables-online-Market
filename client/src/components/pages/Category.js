import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
function Category() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("fruit");

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/products`)
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                const uniqueCategories = [...new Set(data.map(product => product.category))];
                setCategories(uniqueCategories);
            })
            .catch(error => console.error("Error fetching products:", error));
    }, []);

    const filteredProducts = selectedCategory
        ? products.filter(product => product.category === selectedCategory)
        : [];

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold mb-4">Product Categories</h1>

            <div className="flex gap-4 flex-wrap">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-md ${selectedCategory === category ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                    >
                        {category}
                    </button>
                ))}
            </div>

              
            {selectedCategory && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    {filteredProducts.map(product => (
                         <Link 
                         to={`/product/${product._id}`} >
                        <div key={product._id} className="p-4 border rounded-lg shadow-md">
                            <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover rounded-md mb-2" />
                            <h2 className="text-xl font-semibold">{product.name}</h2>
                            <p className="text-gray-600">Category: {product.category}</p>
                            <p className="text-green-500 font-bold">${product.price}</p>
                        </div>
                         </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Category;