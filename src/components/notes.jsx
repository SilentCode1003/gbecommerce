import React, { useState } from "react";

const ProductPage = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);

  // Default values for product (fallback in case product is undefined)
  const defaultProduct = {
    name: "Default Product",
    description: "No description available.",
  };

  // Use defaultProduct if product is undefined
  const currentProduct = product || defaultProduct;

  // Function to handle adding to the quote
  const handleAddToQuote = () => {
    console.log(
      `Product "${currentProduct.name}" added to quote with quantity: ${quantity}`
    );
    setModalOpen(true); // Open the modal or show a success message
  };

  // Function to handle modal close
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Product Details */}
      <h1 className="text-2xl font-semibold mb-4">{currentProduct.name}</h1>
      <p className="text-gray-600 mb-6">{currentProduct.description}</p>

      {/* Quantity Selector */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="1"
          className="border p-2 w-20 text-center"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        {/* Add to Quote Button */}
        <button
          onClick={handleAddToQuote}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add to Quote
        </button>

        {/* Save Button */}
        <button
          onClick={handleAddToQuote} // Reusing the same function
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Save
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <p className="mb-4">Product added to the quote successfully!</p>
            <button
              onClick={handleCloseModal}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;



// ===================================================
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import '../css/AllProducts.css';
import products from '../products.json';
import BreadCrumbs from '../components/BreadCrumbs';
import Rating from '../components/Rating';
import Counter from '../components/Counter';
import ProductTab1 from '../components/ProductTab1';
import ProductsYMLWidget from '../components/ProductsYML';
import Footer from '../components/Footer';
import { PopupBG, PopupContainer } from '../css/GeneralInterface';


const CART_KEY = 'quoteItems'; // Key for localStorage

const Productpage = () => {
  const { id } = useParams();
  const location = useLocation();
  const Product = location.state?.product || products.find((Product) => Product.id === id);

  const [selectedImage, setSelectedImage] = useState(Product?.images[0] || '');
  const [isExpanded, setIsExpanded] = useState(true);
  const [quoteItems, setQuoteItems] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // const [showErrorModal, setShowErrorModal] = useState(false);

  // const handlesave = (event) => {
  //   event.preventDefault();

  //   // Simulating an error 
  //   const ProfileUpdateSuccessful = false;

  //   if (!ProfileUpdateSuccessful) {
  //     setShowErrorModal(true);
  //   } else {
  //     alert("Logged in!");
  //   }
  // }
  const addToQuote = () => {

    if (quantity > 0) {
      const existingItemIndex = quoteItems.findIndex((item) => item.id === Product.id);
      if (existingItemIndex === -1) {
        const updatedItems = [...quoteItems, { ...Product, quantity }];
        setQuoteItems(updatedItems);
        localStorage.setItem(CART_KEY, JSON.stringify(updatedItems));
        alert(`${Product.title} has been added to your quote!`);
      } else {
        const updatedItems = [...quoteItems];
        updatedItems[existingItemIndex].quantity += quantity;
        setQuoteItems(updatedItems);
        localStorage.setItem(CART_KEY, JSON.stringify(updatedItems));
        alert(`${Product.title} quantity has been updated in your quote!`);
      }
    } else {
      alert('Please select a quantity greater than zero.');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImage(Product?.images[0]);

    const savedItems = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    setQuoteItems(savedItems);
  }, [Product]);

  const breadcrumbPaths = [
    { name: 'Home', link: '/' },
    { name: 'Products', link: '/AllProducts' },
    { name: Product ? Product.title : 'Product Details', link: `/products/${id}` },
  ];



  if (!Product) {
    return <div className="text-center text-gray-500">Product Not Found</div>;
  }
  const [activeTab, setActiveTab] = useState('tab1');
  const [transitioning, setTransitioning] = useState(false);

  const handleTabChange = (tab) => {
    if (activeTab !== tab) {
      setTransitioning(true);
      setTimeout(() => {
        setActiveTab(tab);
        setTransitioning(false);
      }, 100); // Slight delay for the transition effect
    }
  };

  const renderContent = () => {
    return (
      <div className={`transition-all duration-500 ease-in-out transform ${transitioning ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}>
        {activeTab === 'tab1' && (
          <ProductTab1 />
        )}
        {activeTab === 'tab2' && (
          <div>
            <h2>Ratings & Reviews</h2>
            <p>Test REVIEW BLAH BLAH.</p>
          </div>
        )}
        {activeTab === 'tab3' && (
          <div>
            <h2>FAQs</h2>
            <p>QUESTIONS BLAH BLAH.</p>
          </div>
        )}
      </div>
    );
  };
  const [isModalOpen, setModalOpen] = useState(false);

  const currentProduct = Product || defaultProduct;

  const handleAddToQuote = () => {
    console.log(
      `Product "${currentProduct.name}" added to quote with quantity: ${quantity}`
    );
    setModalOpen(true); // Open the modal or show a success message
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };


  return (
    <div className="bg--100">
      <BreadCrumbs paths={breadcrumbPaths} className="justify-center" />

      <div className="bg--100 flex flex-col min- px- pb-10">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-[80px] pt-4 justify-center">
          <div className="flex gap-4">
            <div className="flex flex-col gap-4">
              {Product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Image ${index + 1}`}
                  onClick={() => setSelectedImage(image)}
                  className={`w-[90px] h-auto rounded-lg border ${selectedImage === image ? 'border-black' : 'border-gray-300'} shadow-md hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer`}
                />
              ))}
            </div>
            <div className="flex items-start justify-start">
              <img
                src={selectedImage}
                alt="Main Image"
                className="w-full max-w-xs lg:max-w-lg h-auto rounded-xl border border-gray-200 object-cover shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 max-w-2xl">
            <h1 className="text-xl text-gray-500 font-semibold">{Product.type}</h1>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">{Product.title}</h2>
            <Rating />

            <div className="border-t border-gray-200 my-5"></div>

            <p className={`px-4 text-sm lg:text-base text-gray-600 leading-relaxed transition-all duration-300 ease-in-out ${isExpanded ? '' : 'line-clamp-3'}`}>
              {Product.description}
            </p>
            <button
              className="mt-2 text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>

            <div className="border-t border-gray-red-400 my-5"></div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0">
              <Counter onQuantityChange={setQuantity} />

              <button
                className="bg-gradient-to-r from-black to-black text-white font-bold text-lg py-3 px-4 rounded-xl shadow-lg transition-transform transform transition-colors duration-1500 hover:shadow-xl hover:bg-gradient-to-r hover:from-black hover:to-red-900 focus:outline-none focus:ring-4 focus:ring-blue-300"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={addToQuote}
              >
                Add to Quote
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center items-center">

        <button
          onClick={handleAddToQuote} // Reusing the same function
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Save
        </button>
  {/* Modal */}
  {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <p className="mb-4">Product added to the quote successfully!</p>
            <button
              onClick={handleCloseModal}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}



          {/* <button
            className={`text-[0.9rem] bg-[#2E83DB] hover:bg-[#46A0FC] text-white my-6 rounded-[9px] px-4 py-2 transition-colors duration-300 w-1/4 ${isHovering ? 'bg-blue-700' : ''}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={handlesave}
          >
            Save
          </button> */}
{/* 
          {showErrorModal && (
            <div className={PopupBG}>
              <div className={`${PopupContainer} p-6 w-[90%] max-w-sm`} >
                <h2 className="text-xl font-bold mb-4">Profile Updated</h2>
                <p className="text-gray-600 mb-6">Profile updated successfully.</p>
                <div className="flex justify-end gap-2">
                  <button
                    className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                    onClick={() => setShowErrorModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )} */}
        </div> 
        {/* Add ProductPageInfo here */}
        <div className="sm:mx-0 md:mx-10 lg:mx-20 mt-10 px-5 py-2"> {/* Adjusted margins for responsiveness */}
          <div className="w-full mx-auto p-4 rounded-lg border-gray-300">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => handleTabChange('tab1')}
                className={`flex-1 py-2 px-4 text-center rounded-t-lg ${activeTab === 'tab1' ? 'bg-gray-100 border-b-2 border-black font-semibold' : ''}`}
              >
                Product Details
              </button>
              <button
                onClick={() => handleTabChange('tab2')}
                className={`flex-1 py-2 px-4 text-center rounded-t-lg ${activeTab === 'tab2' ? 'bg-gray-100 border-b-2 border-black font-semibold' : ''}`}
              >
                Ratings & Reviews
              </button>
              <button
                onClick={() => handleTabChange('tab3')}
                className={`flex-1 py-2 px-4 text-center rounded-t-lg ${activeTab === 'tab3' ? 'bg-gray-100 border-b-2 border-black font-semibold' : ''}`}
              >
                FAQs
              </button>
            </div>
            <div className="p-4 overflow-auto max-h-96"> {/* Added overflow handling */}
              {renderContent()}
            </div>
          </div>
        </div>

      </div>
      <Footer />

    </div>

  );
};

export default Productpage;


// ==============================================================
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTag } from 'react-icons/fa';
import Footer from '../components/Footer';
import Pagination from '../components/pagination';
import '../css/AllProducts.css';
import '../css/index.css';
import productsData from '../products.json';
import { CardContainer, CardImage } from '../css/GeneralInterface';

const JsonALLproducts = () => {
  const productsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [type, setType] = useState('');
  const [filteredItems, setFilteredItems] = useState(productsData);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

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
    <section className="bg-gray-100 min-h-screen lg:px-5 pt-5 mx-auto relative">
      {/* Sidebar */}
      <div
        className={`transition-all duration-500 fixed top-0 left-0 z-50 ${
          isSidebarCollapsed ? 'w-14' : 'w-64'
        } h-full bg-white shadow-lg flex flex-col`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className={`absolute top-1/2 transform -translate-y-1/2 ${
            isSidebarCollapsed ? 'right-[-10px]' : 'right-[-30px]'
          } bg-blue-600 text-white p-2 rounded-full shadow-md transition-transform`}
        >
          {isSidebarCollapsed ? '→' : '←'}
        </button>

        {!isSidebarCollapsed && (
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Filters</h2>
            <div className="mb-6">
              <label className="block font-semibold mb-2 text-sm text-gray-600">
                <FaTag className="inline mr-2" /> Category
              </label>
              <select
                className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-blue-400"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">All Categories</option>
                {Array.from(new Set(productsData.map((product) => product.type))).map(
                  (category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  )
                )}
              </select>
            </div>
            <button
              onClick={applyFilters}
              className="w-full bg-blue-600 text-white py-2 rounded shadow-md hover:bg-blue-700 transition"
            >
              Apply Filters
            </button>
            <button
              onClick={resetFilters}
              className="w-full bg-red-500 text-white py-2 mt-4 rounded shadow-md hover:bg-red-600 transition"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Products Section */}
      <div className="ml-16 md:ml-64 p-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Search Results</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {currentProducts.length > 0 ? (
            currentProducts.map((items) => (
              <Link to={`/products/${items.id}`} key={items.id}>
                <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
                  <img
                    src={items.imageUrl}
                    alt={items.title}
                    className="w-full h-40 object-cover rounded-md mb-2"
                  />
                  <h3 className="text-sm text-gray-600">{items.type}</h3>
                  <h4 className="text-md font-semibold truncate">{items.title}</h4>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center">No products found</p>
          )}
        </div>

        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageClick}
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
          />
        </div>
      </div>

      <Footer />
    </section>
  );
};

export default JsonALLproducts;



===============================================
import React, { useState } from 'react';
import logo from '../assets/images/5L_logo-white2.png';
import { NavLink } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaBars } from 'react-icons/fa';
import CategoryPopupMenu from './CategoryPopupMenu';
import { NBnavLinkClasses, NBBurgerLinks, NBSpanDivider, NBContainer } from '../css/GeneralInterface';


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={NBContainer}>
      <div className=" flex h-16 items-center justify-between lg:justify-between">
        {/* Burger Menu */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex justify-center text-white text-2xl hover:text-[#f8443c] focus:outline-none transition duration-300">
            <FaBars />
          </button>
        </div>

        {/* Centered Logo */}
        <NavLink to="/" className="absolute left-1/2 transform  -translate-x-1/2 lg:static lg:translate-x-0">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </NavLink>

        {/* Cart Icon for Mobile */}
        <div className="lg:hidden">
          <NavLink to="/cart">
            <FaShoppingCart className="text-white text-2xl  hover:text-[#f8443c] transition duration-300" />
          </NavLink>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex lg:space-x-5 pl-5 items-center">
          <NavLink to="/" className={NBnavLinkClasses}>Home</NavLink>
          <CategoryPopupMenu />
          <NavLink to="/AllProducts" className={NBnavLinkClasses}>Products</NavLink>
          <NavLink to="/json" className={NBnavLinkClasses}>Test</NavLink>

          <NavLink to="/add-job" className={NBnavLinkClasses}>New Arrivals</NavLink>
        </div>

        {/* Search Bar */}
        <div className="hidden lg:flex md:ml-10 md:mr-10 flex-1 items-center justify-center max-w-md">
          <form className="flex items-center w-full">
            <div className="relative w-full">
              {/* <input
                type="text"
                placeholder="Search..."
                className="text-gray-700 bg-gray-300 focus:bg-white p-3 pl-12  pr-4 rounded-full 
                  focus:border-white focus:ring-4 focus:ring-[#FD5249] focus:bg-blue 
                  hover:bg-white outline-none transition-all duration-500 w-full placeholder-gray-500"
              /> */}
              <input
                type="text"
                placeholder="Search..."
                className="text-gray-700   p-3 pl-12  pr-4 rounded-full 
                  focus:border-white focus:ring-4 focus:ring-[#FD5249] focus:bg-blue 
                  hover:bg-white outline-none transition-all duration-500 w-full placeholder-gray-500"
              />
              <FaSearch className="absolute left-[1rem] top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </form>
        </div>

        {/* Account and Cart for Desktop */}
        <div className="hidden lg:flex items-center space-x-5">
          <NavLink to="/cart">
            <FaShoppingCart className="text-white text-[20px] hover:text-[#f8443c] transition duration-300" />
          </NavLink>
          <NavLink to="/AccountPage" className={NBnavLinkClasses}>
            Login / Register
          </NavLink>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="bg-white p-3 my-2 lg:hidden rounded-md xs:rounded-[20px] text-center transition duration-300 ease-in-out">
          {/* Search Box */}
          <div className="flex justify-center mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="text-gray-700 bg-gray-100 p-3 pl-5 pr-4 rounded-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:bg-white outline-none transition duration-300 hover:border-gray-400 w-full max-w-md placeholder-gray-500"
            />
          </div>

          {/* Navigation Links */}
          <div className="flex justify-center items-center flex-wrap space-x-3">
            <NavLink to="/" className={NBBurgerLinks} onClick={() => setIsOpen(false)}>
              Home
            </NavLink>
            <span className={NBSpanDivider}>|</span>
            <NavLink to="/AllProducts" className={NBBurgerLinks} onClick={() => setIsOpen(false)}>
              Products
            </NavLink>
            <span className={NBSpanDivider}>|</span>
            <NavLink to="/add-job" className={NBBurgerLinks} onClick={() => setIsOpen(false)}>
              New Arrivals
            </NavLink>
            <span className={NBSpanDivider}>|</span>
            <NavLink to="/json" className={`${NBBurgerLinks} text-red-700 font-bold`}>
              Test
            </NavLink>
            <span className={NBSpanDivider}>|</span>
            <NavLink to="/AccountPage" className={NBBurgerLinks} onClick={() => setIsOpen(false)}>
              Login
            </NavLink>
          </div>
        </div>
      )}

    </nav>
  );
}

export default Navbar;


=============================
import React, { useEffect, useState } from 'react';
import BreadCrumbs from '../components/BreadCrumbs';
import { FaTrash } from 'react-icons/fa';
import ConfirmationModal from '../components/confirmationmodal';
import Footer from '../components/Footer';
import { PopupBG, CScart, PopupContainer } from '../css/GeneralInterface';
import { backdropStyle } from '../css/GeneralInterface';

const CART_KEY = 'quoteItems';

const Cart = () => {
  const [quoteItems, setQuoteItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    setQuoteItems(savedItems); // Load quote items from local storage
  }, []);

  const openDeleteModal = (id) => {
    setItemToDelete(id);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setItemToDelete(null);
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    const updatedItems = quoteItems.filter(item => item.id !== itemToDelete);
    setQuoteItems(updatedItems);
    localStorage.setItem(CART_KEY, JSON.stringify(updatedItems)); // Update local storage
    closeDeleteModal();
  };

  const updateQuantity = (id, quantity) => {
    const updatedItems = quoteItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    setQuoteItems(updatedItems);
    localStorage.setItem(CART_KEY, JSON.stringify(updatedItems)); // Update local storage
  };

  const handleSave = (event) => {
    event.preventDefault();

    if (quoteItems.length === 0) {
      alert("Your quote is empty.");
      return;
    }

    setShowSaveModal(true);
  };

  const closeSaveModal = () => {
    setShowSaveModal(false);
  };

  const breadcrumbPaths = [
    { name: 'Home', link: '/' },
    { name: 'Quote', link: '/cart' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-fixed bg-center"
      style={backdropStyle}
    >
      <BreadCrumbs paths={breadcrumbPaths} className="justify-center" />

      {/* Main Content */}
      <div className="flex-grow bg--100 pt-4">
        <div className="flex flex-col lg:flex-row gap-4 px-5 sm:px-">
          {/* Left Column */}
          <div className={`${CScart} gap-2`}>
            {quoteItems.length === 0 ? (
              <p className="text-gray-600 ">Your quote is empty.</p>
            ) : (
              quoteItems.map(item => (
                <div
                  key={item.id}
                  className="bg--200 flex items-center justify-between p-4 border border-gray-200 rounded-[5px] hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <img src={item.imageUrl} alt={item.title} className="w-[7rem] h-[7rem] xs:w-[4rem] xs:h-[4rem] rounded-[0px]" />
                    <div>
                      <h2 className="font-semibold text-gray-800 xs:text-[0.9rem] ">{item.title}</h2>
                      <p className="text-sm xs:text-[0.7rem] text-gray-500">{item.type}</p>
                      <p className="text-sm xs:text-[0.7rem] text-gray-500">{item.connected_equipment_guarantee}</p>
                      <div className="mt-2">
                        <label className="text-sm xs:text-[0.7rem] text-gray-700 font-bold">
                          QTY:
                          <input
                            type="number"
                            min="1"
                            value={item.quantity || 1}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                            className="ml-2 w-16 border border-gray-300 rounded px-1"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div
                    className="justify-center items-center space-y-2 text-gray-500 hover:text-red-500 cursor-pointer"
                    onClick={() => openDeleteModal(item.id)}
                  >
                    <button className="flex items-center px-3 py-1 bg-blue-500 rounded-md text-white hover:bg-blue-600  transition">
                        {/* className="text-[0.9rem] bg-blue-500 hover:bg-blue-600 text-white my-6 rounded px-4 py-2 transition-colors duration-300 w-1/4" */}
                      <FaTrash className="mr-2 font-bold" />
                      Delete
                    </button>


                    <span className='flex justify-center items-center px-3 py-1 bg-gray-100 mr-5 font-bold text-gray-600 hover:text-red-500 cursor-pointer'>
                    <FaTrash className="mr-2 font-bold" />
                    Delete</span>
                    {/* <FaTrash className="ml-1" /> */}
                  </div>




                </div>
              ))
            )}
          </div>

          {/* Right Column */}
          <div className={CScart}>
            <p className="text-gray-700 mb-4">Details or links regarding the quote go here.</p>
            <div className="flex justify-center items-center">
              <button
                className="text-[0.9rem] bg-blue-500 hover:bg-blue-600 text-white my-6 rounded px-4 py-2 transition-colors duration-300 w-1/4"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />

      {/* Save Modal */}
      {showSaveModal && (
        <div className={PopupBG}>
          <div className={`${PopupContainer} p-8 w-[90%] max-w-lg`} >

            <h2 className="text-2xl font-bold mb-6 text-gray-800">Quotation Summary</h2>

            {/* Quotation Header */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-500 italic">Date: {new Date().toLocaleDateString()}</p>
              <p className="text-gray-500 italic">Quotation ID: <span className="font-medium">#Q{Math.floor(Math.random() * 10000)}</span></p>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-3 gap-4 items-center border-b-2 border-gray-900 pb-3 mb-4">
              <span className="font-semibold text-gray-800 col-span-2">Description</span>
              <span className="font-semibold text-gray-800 text-center">Quantity</span>
            </div>

            {/* Table Body */}
            <div className="max-h-64 overflow-y-auto">
              <ul className="space-y-4">
                {quoteItems.map(item => (
                  <li key={item.id} className="grid grid-cols-3 gap-4 items-center">
                    <div className="col-span-2">
                      <h3 className="text-gray-700 font-bold ">{item.title}</h3>
                      <p className="text-sm text-gray-500 italic">{item.type}</p>
                      {item.connected_equipment_guarantee && (
                        <p className="text-xs text-gray-400">Guarantee: {item.connected_equipment_guarantee}</p>
                      )}
                    </div>
                    <div className="text-center text-gray-700">{item.quantity}</div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Summary Section */}
            <div className="border-t-2 border-gray-900 mt-6 pt-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-700 font-medium">Total Items:</p>
                <p className="text-gray-800 font-semibold">
                  {quoteItems.reduce((total, item) => total + item.quantity, 0)}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 mt-6">
              <button
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                onClick={closeSaveModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Cart;


======================================================
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import '../css/AllProducts.css';
import products from '../products.json';
import Counter from '../components/Counter';
import ProductTab1 from '../components/ProductTab1';
import Footer from '../components/Footer';
import { PopupBG, PopupContainer } from '../css/GeneralInterface';
import { Image, Breadcrumb, Rate,Button, notification, Space } from "antd";


const close = () => {
  console.log(
    'Notification was closed. Either the close button was clicked or duration time elapsed.',
  );
};

const CART_KEY = 'quoteItems'; // Key for localStorage

const Productpage = () => {
  const { id } = useParams();
  const location = useLocation();
  const Product = location.state?.product || products.find((Product) => Product.id === id);

  const [selectedImage, setSelectedImage] = useState(Product?.images[0] || '');
  const [isExpanded, setIsExpanded] = useState(true);
  const [quoteItems, setQuoteItems] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [addToQuoteSuccess, setShowModal] = useState(false); // State for modal visibility
  const [addToQuoteError, setShowErrorModal] = useState(false); // State for modal visibility

  const addToQuote = () => {
    if (quantity > 0) {
      const existingItemIndex = quoteItems.findIndex((item) => item.id === Product.id);
      if (existingItemIndex === -1) {
        const updatedItems = [...quoteItems, { ...Product, quantity }];
        setQuoteItems(updatedItems);
        localStorage.setItem(CART_KEY, JSON.stringify(updatedItems));
        setShowModal(true); // Show modal after adding to quote
      } else {
        const updatedItems = [...quoteItems];
        updatedItems[existingItemIndex].quantity += quantity;
        setQuoteItems(updatedItems);
        localStorage.setItem(CART_KEY, JSON.stringify(updatedItems));
        setShowModal(true); // Show modal after updating quantity in quote
      }
    } else {
      setShowErrorModal(true); // Show modal after updating quantity in quote
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImage(Product?.images[0]);

    const savedItems = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    setQuoteItems(savedItems);
  }, [Product]);

  const breadcrumbPaths = [
    { name: 'Home', link: '/' },
    { name: 'Products', link: '/AllProducts' },
    { name: Product ? Product.title : 'Product Details', link: `/products/${id}` },
  ];

  if (!Product) {
    return <div className="text-center text-gray-500">Product Not Found</div>;
  }

  const [activeTab, setActiveTab] = useState('tab1');
  const [transitioning, setTransitioning] = useState(false);

  const handleTabChange = (tab) => {
    if (activeTab !== tab) {
      setTransitioning(true);
      setTimeout(() => {
        setActiveTab(tab);
        setTransitioning(false);
      }, 100); // Slight delay for the transition effect
    }
  };

  const renderContent = () => {
    return (
      <div className={`transition-all duration-500 ease-in-out transform ${transitioning ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}>
        {activeTab === 'tab1' && (
          <ProductTab1 />
        )}
        {activeTab === 'tab2' && (
          <div>
            <h2>Ratings & Reviews</h2>
            <p>Test REVIEW BLAH BLAH.</p>
          </div>
        )}
        {activeTab === 'tab3' && (
          <div>
            <h2>FAQs</h2>
            <p>QUESTIONS BLAH BLAH.</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-[#f5f5f5]">
      <Breadcrumb className="bg--200 px-10 pt-10 pb-4 text-sm text-gray-400"
        separator=">"
        items={[
          {
            title: <a href="/">Home</a>,
          },
          {
            title: <a href="/json">All Products</a>,
          },
          {
            title: <a href="">{Product.title}</a>,
          },

        ]}
      />

      <div className='bg-  mlg:mx-10 md:mx-10 sm:mx-5 xs:mx-5 lg:mx-10 grid grid-cols gap-5'>
        <div className="flex bg-white px-7 py-6 flex-col items-center gap-10 lg:flex-row lg:gap-[80px] lg:items-start justify-center">
          {/* Left side (Images) */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-4">
              {Product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Image ${index + 1}`}
                  onClick={() => setSelectedImage(image)}
                  className={`w-[90px] h-auto rounded-lg border ${selectedImage === image ? 'border-black' : 'border-gray-300'} shadow-md hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer`}
                />
              ))}
            </div>

            <div className="flex items-start justify-start">
              <Image

                src={selectedImage}
                alt="Main Image"
                className="w-full max-w-xs lg:max-w-lg h-auto rounded-xl border border-gray-200 object-cover shadow-sm  transition-all duration-300 ease-in-out hover:shadow-red-400]"
              />

            </div>
          </div>





          {/* Right side (Text Content) */}
          <div className="w-full lg:w-1/2 max-w-2xl pt-5">
            <h1 className="text-xl text-gray-500 font-semibold">{Product.type}</h1>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">{Product.title}</h2>
            <Rate disabled allowHalf defaultValue={2.5} />

            <div className="border-t border-gray-200 my-5"></div>

            {/* Set a fixed min height to prevent shifting */}
            <div className="relative overflow-hidden transition-all duration-300 ease-in-out min-h-[72px]">
              <p className={`text-sm lg:text-base text-gray-600 leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
                {Product.description}
              </p>
              <button
                className="text-sm lg:text-base font-bold text-blue-600 leading-relaxed transition-all duration-300 ease-in-out"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? 'Read Less' : 'Read More'}
              </button>
            </div>

            <div className="border-t border-gray-200 my-5"></div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0">
              <Counter onQuantityChange={setQuantity} />

              {/* <button
                className="bg-[#E63535] text-white font-bold text-lg py-3 px-4 rounded-xl shadow-lg transition-colors duration-300 ease-in-out hover:bg-[#E84646] focus:outline-none focus:ring-4 focus:ring-blue-300"
                onClick={addToQuote}
              >
                Add to Quote
              </button> */}
              
            </div>
          </div>
        </div>

        <div className="bg-white h-[30rem] py-2"> {/* Adjusted margins for responsiveness */}
          <div className="w-full mx-auto p-4 rounded-lg border-gray-300">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => handleTabChange('tab1')}
                className={`flex-1 py-2 px-4 text-center rounded-t-lg ${activeTab === 'tab1' ? 'bg-gray-100 border-b-2 border-black font-semibold' : ''}`}
              >
                Product Details
              </button>
              <button
                onClick={() => handleTabChange('tab2')}
                className={`flex-1 py-2 px-4 text-center rounded-t-lg ${activeTab === 'tab2' ? 'bg-gray-100 border-b-2 border-black font-semibold' : ''}`}
              >
                Ratings & Reviews
              </button>
              <button
                onClick={() => handleTabChange('tab3')}
                className={`flex-1 py-2 px-4 text-center rounded-t-lg ${activeTab === 'tab3' ? 'bg-gray-100 border-b-2 border-black font-semibold' : ''}`}
              >
                FAQs
              </button>
            </div>
            <div className="p-4 overflow-auto max-h-96"> {/* Added overflow handling */}
              {renderContent()}
            </div>
          </div>
        </div>

      </div>
      {/* ===================================== */}


      {/* Modal for success message */}
      {addToQuoteSuccess && (
        <div className={PopupBG}>
          <div className={`${PopupContainer} p-6 w-[90%] max-w-sm`}>
            <h2 className="text-xl font-bold mb-4">{`${Product.title} Added`}</h2>
            <p className="text-gray-600 mb-6">{`${Product.title} has been added to your quote!`}</p>
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for success message */}
      {addToQuoteError && (
        <div className={PopupBG}>
          <div className={`${PopupContainer} p-6 w-[90%] max-w-sm`}>
            <h2 className="text-xl font-bold mb-4">{`Please add quantity`}</h2>
            <p className="text-gray-600 mb-6">{`Please select a quantity greater than zero.`}</p>
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                onClick={() => setShowErrorModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Productpage;
// ===============================================================================================
import React, { useState } from "react";
// import { LFLabel, Fieldstyle, inputboxstyle, } from '../css/AccountPagestyles';
import { PopupBG, CSAccount, PopupContainer } from '../css/GeneralInterface';

const LoginWidget = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const handleLogin = (event) => {
        event.preventDefault();

        // Simulating an error 
        const loginSuccessful = false;

        if (!loginSuccessful) {
            setShowErrorModal(true);
        } else {
            alert("Logged in!");
        }
    };
    const inputboxstyle = "bg-gray-200 focus:bg-white border rounded-[9px] px-3 py-[7px] w-full border-gray-300 focus:border-gray-600 mx-auto hover:bg-gray-100 hover:border--400 transition-colors duration-200 outline-none";
    const LFLabel = "text-gray-700 font-bold";
    const Fieldstyle = "flex flex-col gap-1 mb-4";

    
    return (
        <div className="bg--200 flex justify-center pt-4 ">
            <div
                className={`${CSAccount} sm:w-1/2 lg:w-[30rem] md:w-[30rem] sm:w-[25.3rem] xs:w-[23.3rem] px-[4rem] lg:py-8 sm:p-6 xs:p-6`}>

                <h1 className="text-2xl font-bold mb-5 text-left">Login</h1>

                {/* Username Field */}
                <div className={Fieldstyle}>
                    <label className={LFLabel}>Email</label>
                    <input
                        type="text"
                        className={inputboxstyle}
                        placeholder="name@example.com"
                    />
                </div>

                {/* Password Field */}
                <div className={Fieldstyle}>
                    <label className={LFLabel}>Password</label>
                    <input
                        type="password"
                        className={inputboxstyle}
                        placeholder="********"
                    />
                </div>

                {/* Remember Me and Forgot Password */}
                <div className="flex justify-between items-center">
                    <label className="flex items-center text-[0.9rem] text-gray-700">
                        <input
                            type="checkbox"
                            className="mr-2 appearance-none w-[18px] h-[18px] border-2 border-gray-400 rounded-[4.5px] checked:bg-blue-600 checked:border-blue-800 hover:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                        />
                        Remember Me
                    </label>
                    <a
                        href="#"
                        className="text-[0.9rem] text-[#2E83DB] hover:text-[#46A0FC]"
                    >
                        Forgot Password?
                    </a>
                </div>

                {/* Login Button */}
                <div className="flex justify-center">
                    <button
                        className={`text-[0.9rem] bg-[#2E83DB] hover:bg-[#46A0FC] lg:w-full md:w-full sm:w-full text-white my-6 rounded-[9px] px-4 py-2 transition-colors duration-300 w-1/2 ${isHovering ? "bg-blue-700" : ""
                            }`}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        onClick={handleLogin}
                    >
                        Log in
                    </button>
                </div>

                {/* Error Modal */}
                {showErrorModal && (
                    <div className={PopupBG}>
                        {/* <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-sm"> */}
                        <div className={`${PopupContainer} p-6 w-[90%] max-w-sm`} >

                            <h2 className="text-xl font-bold mb-4">Login Error</h2>
                            <p className="text-gray-600 mb-6">Invalid email or password.</p>
                            <div className="flex justify-end gap-2">
                                <button
                                    className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                                    onClick={() => setShowErrorModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginWidget;

// ==============================================================
import React, { useState } from "react";

// import { LFLabel, Fieldstyle, inputboxstyle, } from '../css/AccountPagestyles';
import { PopupBG, CSAccount, PopupContainer } from '../css/GeneralInterface';
import { Button, Form, Input, Select, Space, Tooltip, Typography } from 'antd';

const { Option } = Select;
const onFinish = (values) => {
    console.log('Received values of form: ', values);
};
const LoginWidget = () => {


    return (
        <div className="bg--200 flex justify-center pt-4 ">
            <div
                className={`${CSAccount} sm:w-1/2 lg:w-[30rem] md:w-[30rem] sm:w-[25.3rem] xs:w-[23.3rem] px-[4rem] lg:py-8 sm:p-6 xs:p-6`}>

                <Form
                    name="complex-form"
                    onFinish={onFinish}
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                >
                    <Form.Item label="Username">
                        <Space>
                            <Form.Item
                                name="username"
                                noStyle
                                rules={[
                                    {
                                        required: true,
                                        message: 'Username is required',
                                    },
                                ]}
                            >
                                <Input
                                    style={{
                                        width: 160,
                                    }}
                                    placeholder="Please input"
                                />
                            </Form.Item>
                            <Tooltip title="Useful information">
                                <Typography.Link href="#API">Need Help?</Typography.Link>
                            </Tooltip>
                        </Space>
                    </Form.Item>
                    <Form.Item label="Address">
                        <Space.Compact>
                            <Form.Item
                                name={['address', 'province']}
                                noStyle
                                rules={[
                                    {
                                        required: true,
                                        message: 'Province is required',
                                    },
                                ]}
                            >
                                <Select placeholder="Select province">
                                    <Option value="Zhejiang">Zhejiang</Option>
                                    <Option value="Jiangsu">Jiangsu</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name={['address', 'street']}
                                noStyle
                                rules={[
                                    {
                                        required: true,
                                        message: 'Street is required',
                                    },
                                ]}
                            >
                                <Input
                                    style={{
                                        width: '50%',
                                    }}
                                    placeholder="Input street"
                                />
                            </Form.Item>
                        </Space.Compact>
                    </Form.Item>
                    <Form.Item
                        label="BirthDate"
                        style={{
                            marginBottom: 0,
                        }}
                    >
                        <Form.Item
                            name="year"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            style={{
                                display: 'inline-block',
                                width: 'calc(50% - 8px)',
                            }}
                        >
                            <Input placeholder="Input birth year" />
                        </Form.Item>
                        <Form.Item
                            name="month"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            style={{
                                display: 'inline-block',
                                width: 'calc(50% - 8px)',
                                margin: '0 8px',
                            }}
                        >
                            <Input placeholder="Input birth month" />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default LoginWidget;
