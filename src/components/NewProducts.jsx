import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { VITE_API_KEY } from '../config';
import '../css/AllProducts.css';

const NewProducts = ({ isHome = false }) => {
  const [category, setCategory] = useState([]); 
  const [item, setItem] = useState([]); 
  const [filteredItem, setFilteredItem] = useState([]); 
  const [currentProducts, setCurrentProducts] = useState([]); 

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch("api/category/active", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ APK: VITE_API_KEY }),
        });
        const data = await res.json();
        setCategory(data.data);
      } catch (error) {
        console.log("Error fetching category:", error);
      }
    };

    const fetchItem = async () => {
      try {
        const res = await fetch("api/items/active", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ APK: VITE_API_KEY }),
        });
        const data = await res.json();
        setItem(data.data);
        setFilteredItem(data.data); 
        setCurrentProducts(data.data.slice(0, isHome ? 6 : 6)); 
      } catch (error) {
        console.log("Error fetching items:", error);
      }
    };

    fetchCategory();
    fetchItem();
  }, [isHome]);

  return (
    <section className="bg--200 ml-[20px] mr-[20px] md:px-8 lg:px-18 py-5 mt-2">
      <div className="bg--100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 justify-items-center">
        {currentProducts.length > 0 ? (
          currentProducts.map((items) => (
            <NavLink to={`/products/${items.id}`} key={items.id} className="card bg-white shadow-md rounded-md p- hover:shadow-xlg transition duration-300 ease-in-out">
              <img
                src={items.imageUrl || '/public/AVRG750LCD_F-1024x1024.jpg'} 
                alt={items.name || 'No Image Available'}
                className="w-38 h-38 object-cover mb-1 border-b-[.5px] border-grey-100 rounded-t-md"
                />
              <h3 className="sm:text-[10px] text-xs text-gray-600">{items.category || 'Unknown Category'}</h3>
              <h4 className="sm:text-[14px] text-md font-semibold">{items.name || 'Product Name'}</h4>
            </NavLink>
          ))
        ) : (
          <p className="text-center">No products found</p>
        )}
      </div>
      <section className="bg--200 m-auto max-w-lg  px-6">
      <NavLink
        to="/AllProducts"
        // className="block bg-black text-white text-center w-5xl py-4 px-6 rounded-xl hover:bg-gray-700"
       className="bg-white py-[10px] text-black font-bold w-[13rem] text-center mx-auto block rounded-[62px] outline outline-[1px] outline-gray-800 transition-all duration-300 
       hover:bg-red-700 hover:text-white hover:shadow-[0px_4px_10.3px_#363636c8] transition duration-300 ease-in-out hover:rounded-[62px]
         active:bg-[#801616] active:shadow-[0_4px_8px_rgba(255,0,0,0.4)] ">
        View More</NavLink>
    </section>
    </section>
  );
};

export default NewProducts;
