import React, { useState } from "react";
import logo from "../assets/images/5L_logo-white2.png";
import { NavLink } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaBars, } from "react-icons/fa";
import CategoryPopupMenu from "./CategoryPopupMenu";
import { NBnavLinkClasses, NBBurgerLinks, NBSpanDivider, NBContainer } from "../css/GeneralInterface";
import { Input, AutoComplete, Space, Dropdown, Button } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import Products from '../products.json';



function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const options = [
    { value: 'Burns Bay Road' },
    { value: 'Downing Street' },
    { value: 'Wall Street' },
  ];
  const categories = Products.reduce((acc, product) => {
    const { type, subcategories } = product;

    if (!acc[type]) {
      acc[type] = new Set(subcategories || []);
    } else {
      product.subcategories?.forEach(subcategory => acc[type].add(subcategory));
    }
    return acc;
  }, {});
  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item
        </a>
      ),
    },
  ];
  return (
    <>
      {isSearchFocused && (
        <div className="fixed inset-0 bg-black bg-opacity-70 transition-opacity duration-300 z-40"></div>
      )}

      {/* Navbar */}
      <nav className={`${NBContainer} relative z-50`}>
        <div className="flex h-[3rem] items-center justify-between lg:justify-between">
          {/* Burger Menu */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex justify-center text-white text-2xl hover:text-[#f8443c] focus:outline-none transition duration-300"
            >
              <FaBars />
            </button>
          </div>

          {/* Centered Logo */}
          <NavLink to="/" className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:translate-x-0">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          </NavLink>

          {/* Cart Icon for Mobile */}
          <div className="lg:hidden">
            <NavLink to="/cart">
              <FaShoppingCart className="text-white text-2xl hover:text-[#f8443c] transition duration-300" />
            </NavLink>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex lg:space-x-5 pl-5 items-center">
            <NavLink to="/" className={NBnavLinkClasses}>Home</NavLink>
            <CategoryPopupMenu />
            {/* <Space direction="vertical">
            <Space wrap>  
              <Dropdown
                menu={{ items }}
                placement="bottomLeft"
              >
              <Button className="bg-[#b12822] text-white border-2 border-white font-bold text-lg transition-all duration-300 hover:bg-white hover:text-[#b12822] hover:border-[#b12822]"
                  style={{
                    fontFamily: "sans-serif",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    backgroundColor: "#b12822",
                    // color: "black",
                    border: "2px solid white",
                    transition: "all 0.3s ease-in-out",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#b12822";
                    e.target.style.backgroundColor = "white";
                    e.target.style.border = "2px solid #b12822";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "white";
                    e.target.style.backgroundColor = "#b12822";
                    e.target.style.border = "2px solid white";
                  }}
                >
                  Categories
                </Button>
              </Dropdown>
            </Space>
          </Space> */}
            <NavLink to="/AllProducts" className={NBnavLinkClasses}>Products</NavLink>
            <NavLink to="/json" className={NBnavLinkClasses}>Test</NavLink>
            <NavLink to="/add-job" className={NBnavLinkClasses}>New Arrivals</NavLink>
          </div>
          {/* ======================================================= */}
         


          {/* ======================================================= */}

          {/* Search Bar */}
          <div className="hidden lg:flex md:ml-10 md:mr-10 flex-1 items-center justify-center max-w-md">
            <form className="flex items-center w-full">
              <div className="relative w-full">
                {/* <Input
                  className="text-gray-700 rounded-[15px]"
                  size="large"
                  placeholder="Search..."
                  prefix={<FaSearch />}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                /> */}

                <AutoComplete
                  style={{ width: "100%" }}
                  options={options}
                  filterOption={(inputValue, option) =>
                    option.value.toUpperCase().includes(inputValue.toUpperCase())
                  }
                >
                  <Input
                    size="large"
                    className="text-gray-700 rounded-[15px]"
                    placeholder="Search..."
                    prefix={<FaSearch />}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    allowClear={{ clearIcon: <CloseCircleOutlined /> }}

                  />
                </AutoComplete>
              </div>
            </form>
          </div>

          {/* Account and Cart for Desktop */}
          <div className="hidden lg:flex items-center space-x-5">
            <NavLink to="/cart">
              <FaShoppingCart className="text-white text-[20px] hover:text-[#f8443c] transition duration-300" />
            </NavLink>
            <NavLink to="/AccountPage" className={NBnavLinkClasses}>Login / Register</NavLink>
          </div>
        </div>
        {/* Mobile Menu */}
        {isOpen && (
          <div className="bg-white p-3 my-2 lg:hidden rounded-md xs:rounded-[20px] text-center transition duration-300 ease-in-out">
            {/* Search Box */}
            <div className="flex justify-center mb-4">
              {/* <input
                type="text"
                placeholder="Search..."
                className="text-gray-700 bg-gray-100 p-3 pl-5 pr-4 rounded-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:bg-white outline-none transition duration-300 hover:border-gray-400 w-full max-w-md placeholder-gray-500"
              />
               */}
              <AutoComplete
                style={{ width: "100%" }}
                options={options}
                filterOption={(inputValue, option) =>
                  option.value.toUpperCase().includes(inputValue.toUpperCase())
                }
              >
                <Input
                  size="large"
                  className="text-gray-700 rounded-[15px]"
                  placeholder="Search..."
                  prefix={<FaSearch />}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  allowClear={{ clearIcon: <CloseCircleOutlined /> }}

                />
              </AutoComplete>
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
    </>
  );
}

export default Navbar;
