import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight, FaFilter, FaTag } from 'react-icons/fa';
import { MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import Footer from '../components/Footer';
import '../css/AllProducts.css';
import '../css/index.css';
import { VITE_API_KEY } from '../config';
import { Breadcrumb } from "antd";

const AllProducts = () => {
  const productsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [type, setType] = useState(''); // Filter state for category
  const [category, setCategory] = useState([]);
  const [item, setItem] = useState([]); // All products
  const [filteredItem, setFilteredItem] = useState([]); // Filtered products
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const previousButtonStyle =
    'flex items-center justify-center space-x-2 text-black bg-white w-[120px] border border-[1px] border-black rounded-[9px] px-2 py-1 hover:bg-red-700 hover:text-white transition duration-300 ease-in-out';
  const nextButtonStyle =
    'flex items-center justify-center space-x-2 text-black bg-white w-[120px] border border-[1px] border-black rounded-[9px] px-2 py-1 hover:bg-red-700 hover:text-white transition duration-300 ease-in-out';
  const arrowStyleA = 'text-white text-sm mb-5';
  const arrowStyleB = 'text-white text-sm mt-5';

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch('api/category/active', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ APK: VITE_API_KEY }),
        });
        const data = await res.json();
        setCategory(data.data);
      } catch (error) {
        console.log('Error fetching category:', error);
      }
    };

    const fetchItem = async () => {
      try {
        const res = await fetch('api/items/active', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ APK: VITE_API_KEY }),
        });
        const data = await res.json();
        setItem(data.data);
        setFilteredItem(data.data);
      } catch (error) {
        console.log('Error fetching items:', error);
      }
    };

    fetchCategory();
    fetchItem();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const totalPages = Math.ceil(filteredItem.length / productsPerPage);

  const currentProducts = filteredItem.slice(
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
  };

  const applyFilters = () => {
    if (type) {
      const filtered = item.filter((product) => product.category === type);
      setFilteredItem(filtered);
    } else {
      setFilteredItem(item); // If no filter is selected, show all products
    }
    setCurrentPage(1); // Reset to first page after applying filters
  };

  return (
    <section className="bg-white-100 min-h-auto px- pt-5 mx-auto relative">
      <Breadcrumb className="bg--200 px-10 pt-10 pb-4 text-sm text-gray-400"
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
        className={`transition-all duration-500 ease-in-out fixed top-1/2 transform -translate-y-1/2 left-0 z-50 ${isSidebarCollapsed ? 'w-10' : 'w-64'
          } rounded-r-[9px] bg-[#ffffff] shadow-[1px_0px_10px_0px_rgba(0,0,0,25%)]`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}

          className={`absolute top-1/2 transform -translate-y-1/2 ${isSidebarCollapsed ? 'right-[13px]' : 'right-[-27px]'
            } bg-gray-800 py-1 w-[27px] rounded-r-[5px] flex justify-center items-center transition duration-300 ease-in-out hover:bg-red-700`}
        >
          {isSidebarCollapsed ? (
            <div className="flex flex-col justify-center items-center">
              <MdKeyboardDoubleArrowRight className={arrowStyleA} />
              <span className="text-center text-xs font-bold text-white transform rotate-90 my-1">
                Filter
              </span>
              <MdKeyboardDoubleArrowRight className={arrowStyleB} />
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <MdKeyboardDoubleArrowLeft className={arrowStyleA} />
              <span className="text-center text-xs font-arrowStyleA text-white transform -rotate-90 my-1">
                Hide
              </span>
              <MdKeyboardDoubleArrowLeft className={arrowStyleB} />
            </div>
          )}
        </button>

        {/* Sidebar Content */}
        {!isSidebarCollapsed && (
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Filters</h2>
            <ul className="space-y-4">
              {/* Category Filter */}
              <li className="filter-item">
                <label className="font-semibold text-sm text-gray-700 flex items-center">
                  <FaTag className="mr-2" />
                  Category
                </label>
                <select
                  className="mt-2 p-2 text-xs border rounded w-full"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="">All Category</option>
                  {category.map((cat, index) => (
                    <option key={index} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
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
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Products Section */}
        <div className="bg--100 w-full sm:w-[350px] md:w-[95rem] p-3 mx-auto md:min-h-[740px]">
          <h2 className="bg--100 text-xl font-bold mb-4 text-left">Search Results</h2>
          <div className="bg--100 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 gap-3 justify-items-center">
            {currentProducts.length > 0 ? (
              currentProducts.map((items) => (
                <div
                  key={items.id}
                  className="card bg-white shadow-md rounded-md p- hover:shadow-xlg transition duration-300 ease-in-out"
                >
                  <img
                    src="/public/AVRG750LCD_F-1024x1024.jpg"
                    alt="no image"
                    className="w-38 h-38 object-cover mb-1 border-b-[.5px] border-grey-100 rounded-t-md"
                  />
                  <h3 className="sm:text-[10px] text-xs text-gray-600">{items.category}</h3>
                  <h4 className="sm:text-[14px] text-md font-semibold">{items.name}</h4>
                </div>
              ))
            ) : (
              <p className="text-center">No products found</p>
            )}
          </div>

          <div className="divider lg:mt-[2rem] lg:mb-[1rem]"></div>
          <div className="flex justify-between items-center my-5 bg--100">
            <div className={previousButtonStyle}>
              <FaArrowLeft />
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={` ${currentPage === 1 ? 'disabled' : ''}`}
              >
                Previous
              </button>
            </div>

            <div className="page-numbers flex">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageClick(i + 1)}
                  className={`px-3 py-1 border ${currentPage === i + 1 ? 'bg-gray-200' : ''
                    }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <div className={nextButtonStyle}>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={` ${currentPage === totalPages ? 'disabled' : ''}`}
              >
                Next
              </button>
              <FaArrowRight />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
};

export default AllProducts;
