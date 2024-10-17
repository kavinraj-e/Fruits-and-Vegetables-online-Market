import React, { useState, useEffect } from 'react';
import Product from './Product';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from './Loader';
import Hero from '../Layout/Hero';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Corrected initial state
  const [searchText, setSearchText] = useState("");

  //   const username = async (req) => {
  //     try {
  //       const { token  }  = req.cookies;

  //      if( !token ){
  //           console.log("not found");
  //      }
  //      const decoded = jwt.verify(token, process.env.JWT_SECRET)
  //      console.log(decoded.id);


  //     }
  //     catch(error){
  //  console.log("error is attaking",error)
  //     }
  //   };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/products`);
        setProducts(response.data);
        toast.success('Product Fetch successfully!');
        setLoading(false); // Corrected to set loading to false after data fetch
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    // Render Loader if loading is true, otherwise render products

    loading ? <Loader /> : (
      <div className='bg-[f8f8ff]'>


        <Hero />
        <div className="font-sans text-black my-10  bg-white flex items-center justify-center">
  <input
    type="text"
    value={searchText}
    className="px-4 w-[40%] py-2 rounded-lg border border-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    placeholder="Search..."
    onChange={(e) => setSearchText(e.target.value)}
  />
</div>


        <h1 className='text-3xl  mx-5 my-5 font-bold font-heading'>Fresh Product</h1>
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
