import React, { useState } from 'react';
import { FaCaretDown, FaCaretRight } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Products from '../products.json';

const CategoryPopupMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState(null);

  const categories = Products.reduce((acc, product) => {
    const { type, subcategories } = product;

    if (!acc[type]) {
      acc[type] = new Set(subcategories || []);
    } else {
      product.subcategories?.forEach(subcategory => acc[type].add(subcategory));
    }
    return acc;
  }, {});

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
    setOpenSubMenuIndex(null);
  };

  const handleSubMenuEnter = (index) => {
    setOpenSubMenuIndex(index);
  };

  const handleSubMenuLeave = () => {
    setOpenSubMenuIndex(null);
  };

  return (
    <div className="relative" onMouseLeave={handleMouseLeave}>
      <NavLink
        className=" bg-blue-200 flex items-center gap-2 text-black font-bold font-sans cursor-pointer"
        style={{
          padding: '2px 10px',
          color: isOpen ? '#b91c1c' : 'white',
          border: isOpen ? '1px solid gray' : '1px solid white',
          backgroundColor: isOpen ? 'white' : 'transparent',
          borderRadius: '5px',
          transition: 'color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease, transform 0.3s ease',
        }}
        onMouseEnter={handleMouseEnter}
      >
        Category
        <span
          className="flex"
          style={{
            transition: 'transform 1s ease',
            transform: isOpen ? 'rotate(5deg)' : 'none',
          }}
        >
          {isOpen ? <FaCaretDown /> : <FaCaretRight />}
        </span>
      </NavLink>
      <div
        className="absolute text-black bg-white border shadow-lg z-50"
        style={{
          top: '26px',
          left: 0,
          marginTop: '3px',
          borderColor: '#ddd',
          minWidth: '250px',
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden',
          transform: isOpen ? 'translateY(0)' : 'translateY(-10px)',
          transition: 'opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease',
        }}
        onMouseEnter={handleMouseEnter}
      >
        <ul className="list-none m-0 p-0">
          {Object.keys(categories).map((category, index) => (
            <li
              key={index}
              className="relative hover:bg-gray-300  transition-colors duration-300"
              style={{
                padding: '15px 20px',
                cursor: 'pointer',
                borderBottom: '1px solid #ddd',
              }}
              onMouseEnter={() => handleSubMenuEnter(index)}
              onMouseLeave={handleSubMenuLeave}
            >
              {category}
              <div
                className="absolute bg-white border shadow-lg z-50"
                style={{
                  top: 0,
                  left: '100%',
                  borderColor: '#ddd',
                  minWidth: '200px',
                  opacity: openSubMenuIndex === index ? 1 : 0,
                  visibility: openSubMenuIndex === index ? 'visible' : 'hidden',
                  transform: openSubMenuIndex === index ? 'translateX(0)' : 'translateX(-10px)',
                  transition: 'opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease',
                }}
              >
                <ul className="list-none m-0 p-0">
                  {[...categories[category]].map((subcategory, subIndex) => (
                    <li
                      key={subIndex}
                      className=" hover:bg-gray-100 transition-colors duration-300"
                      style={{
                        padding: '10px 15px',
                        cursor: 'pointer',
                        borderBottom: '1px solid #ddd',
                      }}
                    >
                      {subcategory}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryPopupMenu;
