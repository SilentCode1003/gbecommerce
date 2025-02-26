import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import ConfirmationModal from '../components/confirmationmodal';
import Footer from '../components/Footer';
import { PopupBG, CScart, PopupContainer } from '../css/GeneralInterface';
import { backdropStyle } from '../css/GeneralInterface';
import { Breadcrumb } from "antd";

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
      <Breadcrumb className="bg--200 px-10 pt-10 pb-4 text-sm text-gray-400"
        separator=">"
        items={[
          {
            title: <a href="/">Home</a>,
          },
          {
            title: <a href="">Cart</a>,
          },


        ]}
      />

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
                  className="bg-white-100 block sm:flex items-center space-y-4 justify-between p-4 border border-gray-200 rounded-[5px] hover:shadow-md transition-shadow duration-500"
                >
                  <div className="bg--200 flex items-center gap-4 p- ">
                    <img src={item.imageUrl} alt={item.title} className="lg:w-[7rem] lg:h-[7rem] xs:w-[6rem] xs:h-[6rem] sm:w-[7rem] sm:h-[7rem] rounded-[0px]" />
                    <div>
                      <h2 className="font-semibold text-gray-800 xs:text-[0.9rem] truncate overflow-hidden whitespace-nowrap w-48 ">{item.title}</h2>
                      <div className="max-w-xs">
                        <h2 className="font-semibold text-gray-800 sm:text-[0.9rem] truncate overflow-hidden whitespace-nowrap xs:w-48 md:lg:w-[17rem]">
                          testtttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt
                        </h2>
                      </div>


                      <p className="text-sm xs:text-[0.7rem] text-gray-500 truncate overflow-hidden whitespace-nowrap w-48">{item.type}</p>
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
                    className="sm:bg--100 md:bg--100 flex p-2 flex-col justify-center items-center space-y-2 text-gray-500 hover:text-red-500 cursor-pointer"
                    onClick={() => openDeleteModal(item.id)}
                  >
                    <button className="flex items-center px-3 py-1 bg-blue-500 rounded-md text-white hover:bg-blue-600  transition">
                      {/* className="text-[0.9rem] bg-blue-500 hover:bg-blue-600 text-white my-6 rounded px-4 py-2 transition-colors duration-300 w-1/4" */}
                      <FaTrash className="mr-2 font-bold" />
                      Delete
                    </button>

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
