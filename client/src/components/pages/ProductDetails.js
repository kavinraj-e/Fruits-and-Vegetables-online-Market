import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';



const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/products/${id}`, { withCredentials: true });
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const addtocart = async () => {

    try {
      await axios.post('http://localhost:8000/api/addtocart', { productId: id, quantity: 1 }, { withCredentials: true });
      toast.success('Items Add to Card successfully!');
    } catch (error) {
      toast.error('Login first to Continue successfully!');
    }
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        {product && (
          <>
            <section className="text-gray-700 body-font overflow-hidden bg-white">
              <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                  <img alt="ecommerce" className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={product.imageUrl} />
                  <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                    <h2 className="text-sm title-font text-gray-700 tracking-widest">{product.category}</h2>
                    <h1 className="text-gray-900 text-4xl title-font font-bold mb-1">{product.name}</h1>
                    <div className="flex mb-4">
                      <span className="title-font font-medium text-2xl text-gray-900">${product.price}</span>
                    </div>
                    <p className="leading-relaxed">{product.description}</p>
                    <div className="flex border-t border-gray-300 mt-5 pt-5">
                      <Link to="#"   onClick={()=>{addtocart()}} className="bg-gray-800 duration-200 focus:outline-none focus:shadow-outline font-medium h-12 hover:bg-gray-900 inline-flex items-center justify-center px-6 text-white tracking-wide transition w-full">
                        Add to Cart
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </section>
  );
}

export default ProductDetails;
