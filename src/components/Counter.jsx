// Counter.js
import React, { useState, useEffect } from 'react';

const Counter = ({ onQuantityChange }) => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount(prevCount => Math.max(prevCount - 1, 0));
  };

  const handleChange = (event) => {
    const value = event.target.value;
    // Ensure the value is a valid number or empty string
    if (/^\d*$/.test(value)) {
      setCount(value === '' ? '' : parseInt(value, 10));
    }
  };

  const handleBlur = () => {
    // Handle conversion when the input loses focus
    setCount(prevCount => (isNaN(prevCount) ? 0 : prevCount));
  };

  // Call the onQuantityChange prop whenever count changes
  useEffect(() => {
    onQuantityChange(count);
  }, [count, onQuantityChange]);

  return (
    <div className="flex items-center">
      <button
        onClick={handleDecrement}
        className="w-[50px] bg-gray-500 text-white p-2 rounded-l-[20px] border border-gray-400 hover:bg-red-600 focus:outline-none"
      >
        -
      </button>
      <input
        type="text"
        value={count}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-16 text-center border-t border-b border-gray-400 p-2 rounded-none"
        />
      <button
        onClick={handleIncrement}
        className="w-[50px] bg-gray-500 text-white p-2 rounded-r-[20px] border border-gray-400 hover:bg-green-600 focus:outline-none"
      >
        +
      </button>
    </div>
  );
};

export default Counter;
