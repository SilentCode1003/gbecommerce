import { useState, useEffect } from 'react';
import reviews from '../reviews.json';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import StarRating from './Rating';

const CustomerReviews = () => {
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(0);
  const [animationStyle, setAnimationStyle] = useState({}); // Inline animation style

  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  // Define inline styles for fade-out and fade-in animations
  const fadeOutStyle = {
    opacity: 0,
    transform: 'scale(1.05)',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
  };

  const fadeInStyle = {
    opacity: 0,
    transform: 'scale(0.95)',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
  };

  const activeStyle = {
    opacity: 1,
    transform: 'scale(1)',
  };

  // Navigate to the previous page
  const prevPage = () => {
    setAnimationStyle(fadeOutStyle);
    setTimeout(() => {
      setCurrentPage((prevPage) => (prevPage === 0 ? totalPages - 1 : prevPage - 1));
      setAnimationStyle(fadeInStyle);
    }, 300); // Match transition duration
  };

  // Navigate to the next page
  const nextPage = () => {
    setAnimationStyle(fadeOutStyle);
    setTimeout(() => {
      setCurrentPage((prevPage) => (prevPage === totalPages - 1 ? 0 : prevPage + 1));
      setAnimationStyle(fadeInStyle);
    }, 300);
  };

  // Reset to active style after each transition
  useEffect(() => {
    const timer = setTimeout(() => setAnimationStyle(activeStyle), 300); // Match transition duration
    return () => clearTimeout(timer);
  }, [currentPage]);

  // Calculate the reviews to display on the current page
  const currentReviews = reviews.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <div className="bg-gray-50 p-5 rounded-lg shadow-lg max-w-4xl mx-auto my-10 text-center relative">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Customer Reviews</h2>

      <div className="relative flex items-center justify-center">
        {/* Previous button */}
        <button
          onClick={prevPage}
          className="p-3 bg-gray-300 rounded-full hover:bg-gray-400 transition-all duration-300 ease-in-out absolute left-4 top-1/2 transform -translate-y-1/2 z-10"
          aria-label="Previous reviews"
        >
          <FaChevronLeft size={20} />
        </button>

        {/* Review Cards with Animation */}
        <div className="flex overflow-hidden w-full max-w-3xl">
          <div className="flex transition-all duration-300 ease-in-out" style={animationStyle}>
            {currentReviews.map((review, index) => (
              <div
                key={index}
                className="bg-green-100 p-3 rounded-lg shadow-md w-full md:w-[14rem] max-w-xs mx-2 transform transition duration-300 hover:scale-105 flex-shrink-0"
              >
                <h3 className="text-[1.3rem] font-semibold mb-2 text-gray-900">{review.name}</h3>
                <div className="flex justify-center">
                  <StarRating rating={review.rating} className="align-middle" />
                </div>
                <p className="text-gray-700 mt-4 italic text-[.8rem]">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Next button */}
        <button
          onClick={nextPage}
          className="p-3 bg-gray-300 rounded-full hover:bg-gray-400 transition-all duration-300 ease-in-out absolute right-4 top-1/2 transform -translate-y-1/2 z-10"
          aria-label="Next reviews"
        >
          <FaChevronRight size={20} />
        </button>
      </div>

      {/* Pagination Indicators */}
      <div className="mt-6 flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`h-3 w-3 rounded-full ${currentPage === index ? 'bg-blue-500' : 'bg-gray-300'} transition-all duration-300`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;
