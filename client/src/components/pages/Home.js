import React, { useState, useEffect } from 'react';
import Product from './Product';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from './Loader';
import Hero from '../Layout/Hero';
import { Search } from "lucide-react";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/products`);
        setProducts(response.data);
        toast.success('Product Fetch successfully!');
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    loading ? <Loader /> : (
      <div className='bg-[f8f8ff]'>
        <Hero />
        <div className="flex items-center bg-white shadow-lg rounded-full px-4 py-2 w-96 border border-gray-200 focus-within:border-orange-500 transition-all mx-auto my-10">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={searchText}
            className="flex-1 bg-transparent outline-none px-3 text-gray-700 placeholder-gray-400"
            placeholder="Search..."
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <h1 className='text-3xl mx-5 my-5 font-bold font-heading'>Fresh Product</h1>
        <div className='flex flex-wrap my-10 gap-10 mx-10 '>
          {products.filter((product) => product.name.toLowerCase().includes(searchText.toLowerCase())).map(product => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
    )
  );
}

export default Home;
