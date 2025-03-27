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
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
        setProducts(response.data);
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

       
        <div className="flex items-center w-full max-w-lg mx-auto my-10 border-b-2 border-gray-300 focus-within:border-green-500 transition-all">
          <Search className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            value={searchText}
            className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 py-2"
            placeholder="Search for fresh fruits and vegetables..."
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <h1 className='text-3xl mx-5 my-5 font-bold font-heading'>Fresh Product</h1>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-8 gap-4 mx-5'>

          {products.filter((product) => product.name.toLowerCase().includes(searchText.toLowerCase())).map(product => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
    )
  );
}

export default Home;