import React, { useState,  } from 'react';
import { Link } from 'react-router-dom';
import { FaTag } from 'react-icons/fa';
import Footer from '../components/Footer';
import '../css/AllProducts.css';
import '../css/index.css';
import productsData from '../products.json';
import { CardContainer, CardImage } from '../css/GeneralInterface';
import { Breadcrumb, Pagination, Rate, Select } from "antd";


const JsonALLproducts = () => {
  const productsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [type, setType] = useState('');
  const [filteredItems, setFilteredItems] = useState(productsData);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true); // Correct state definition

  const totalPages = Math.ceil(filteredItems.length / productsPerPage);

  const currentProducts = filteredItems.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
    // window.location.reload(); // Refreshes the page
  };

  const applyFilters = () => {
    if (type) {
      const filtered = productsData.filter((product) => product.type === type);
      setFilteredItems(filtered);
    } else {
      setFilteredItems(productsData);
    }
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setType('');
    setFilteredItems(productsData);
    setCurrentPage(1);
  };



  return (
    <section className="bg-[#f5f5f5] min-h-auto lg:px- pt- mx-auto relative ">
      <Breadcrumb className="bg--200 px-10 pt-10 pb-4 text-sm text-gray-400"
        separator=">"
        items={[
          {
            title: <a href="/">Home</a>,
          },
          {
            title: <a href="/cart">All Products</a>,
          },

        ]}
      />


      {/* Sidebar */}
      <div
        className={`bg--300  transition-all duration-500 ease-in-out fixed top-1/2 transform -translate-y-1/2 left-0 z-50 ${isSidebarCollapsed ? 'w-10' : 'w-64'
          } rounded-r-[20px] bg-[#ffffff] shadow-[1px_0px_10px_0px_rgba(0,0,0,25%)]`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className={`absolute top-1/2 transform -translate-y-1/2 ${isSidebarCollapsed ? 'right-[13px]' : 'right-[-27px]'
            } bg-gray-800 py-1 w-[27px] rounded-r-[5px] flex justify-center items-center transition duration-300 ease-in-out hover:bg-red-700`}
        >
          {isSidebarCollapsed ? (
            <div className="flex flex-col justify-center items-center">
              <span className="text-white">→</span>
              <span className="text-center text-xs font-bold text-white transform rotate-90 my-1">
                Filter
              </span>
              <span className="text-white">→</span>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <span className="text-white">←</span>
              <span className="text-center text-xs font-bold text-white transform -rotate-90 my-1">
                Hide
              </span>
              <span className="text-white">←</span>
            </div>
          )}
        </button>

        {/* Sidebar Content */}
        {!isSidebarCollapsed && (
          <div className="p-4 bg-white rounded-r-[13px]">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Filters</h2>
            <ul className="space-y-4 bg--400">
              <li className="filter-item">
                <label className="font-semibold text-sm text-gray-700 flex items-center">
                  <FaTag className="mr-2" />
                  Category
                </label>
                {/* 
                <select
                  className="mt-2 p-2 text-xs border bg--300 rounded w-full"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option className="rounded-t-[30px] text-gray-300" value="">
                    ----------- All Categories -----------
                  </option>

                  {Array.from(new Set(productsData.map((product) => product.type))).map(
                    (category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    )
                  )}
                </select> */}
                <Select
                  value={type}
                  onChange={(value) => setType(value)}
                  className="w-full"
                  placeholder="----------- All Categories -----------"
                >
                  <Select.Option key="all" value="">
                    ----------- All Categories -----------
                  </Select.Option>
                  {Array.from(new Set(productsData.map((product) => product.type))).map(
                    (category, index) => (
                      <Select.Option key={index} value={category}>
                        {category}
                      </Select.Option>
                    )
                  )}
                </Select>

              </li>
            </ul>

            {/* Apply Filters Button */}
            <div className="mt-4">
              <button
                onClick={applyFilters}
                className="bg-[#4670D6] text-white font-semibold font-sans text-sm py-2 px-4 w-full rounded-[5px] shadow-md hover:bg-[#365bb1] focus:outline-none focus:ring-2 focus:ring-[#4670D6] transition duration-300 ease-in-out active:bg-[#2d4f94]"
              >
                Apply Filters
              </button>
            </div>

            {/* Reset Filters Button */}
            <div className="mt-4">
              <button
                onClick={resetFilters}
                className="bg-red-500 text-white font-semibold font-sans text-sm py-2 px-4 w-full rounded-[5px] shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 ease-in-out active:bg-red-700"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bg--100 flex flex-col md:flex-center">
        {/* Products Section */}
        <div className="bg--100  xl:px-[10rem] px-8 py-4 ">
          <h2 className=" text-xl font-bold mb-4 text-gray-800">Search Results</h2>
          <div className="bg--100 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 ">
            {currentProducts.length > 0 ? (
              currentProducts.map((items) => (
                <Link to={`/products/${items.id}`} key={items.id}>
                  {/* <div className="p-4  bg--100 rounded-lg  hover:shadow-lg transition hover:border-red-500 hover:border-[1.5px] hover:shadow-[0px_4px_10px_rgba(0,0,0,0.3)]"> */}
                  {/* <div className="p-4  bg--100 rounded-lg shadow-lg hover:shadow-lg transition hover:border-red-500 hover:border-[1.5px] hover:shadow-[0px_4px_10px_rgba(0,0,0,0.3)] "> */}
                  <div className={CardContainer}>
                    <img
                      src={items.imageUrl}
                      alt={items.title}
                      className={CardImage}
                    />
                    <div className='bg--100 w-full h-full p-[.5rem] pb-[2rem]'>
                      <div className="space-y-[.2rem]">
                        <h3 className="text-[0.8rem] font-semibold xl:text-[0.9rem] truncate text-left">{items.title}</h3>
                        <h4 className="text-[0.6rem] text-md font-regular truncate">{items.capacity}</h4>
                        <h4 className="text-[0.6rem] text-md font-regular truncate">{items.topology}</h4>
                        {/* <Rating /> */}
                        <Rate disabled allowHalf defaultValue={2.5} />
                      </div>
                    </div>


                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center">No products found</p>
            )}
          </div>
          <div className="mt-20 bg--100">
            <Pagination defaultCurrent={1} total={100} className='justify-center' />
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default JsonALLproducts;
