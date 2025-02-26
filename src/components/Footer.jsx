import React from 'react';
import logo from '../assets/images/5L_logo-white2.png';
import { GoArrowUpRight } from 'react-icons/go';
import {ListHeader, ListClass, LinkItems  } from '../css/GeneralInterface';


// import logo from '../assets/images/5L_logo-Red.png';
import Newsletterstrip from '../components/Newsletterstrip';

const Footer = () => {
  const goAUR ='ml-[.1rem] text-[.8rem]';
  const currentYear = new Date().getFullYear(); //year

  return (
    <div className="bg-300 rounded-t-lg mt-[6rem] ">
      {/* Newsletter */}
      <Newsletterstrip />

      {/* Footer Columns */}
      <div className="flex flex-col sm:flex-col md:flex-row justify-between gap-8 px-6 py-10 sm:px-10 lg:px-20 xl:px-28 bg-[#383838] ">

        {/* Column 1: Logo and Quick Links */}
        <div className="bg- flex-1 text-center md:text-left md:mb-0">
          <img className="h-10 w-auto mx-auto md:mx-0 " src={logo} alt="Logo" />
          <ul className="bg- space-y-3 text-[#9C9C9C] font-sans text-center mt-4 md:text-left pr-[20px] sm:text-[1rem]  sm:py-[10px] md:py-[4px]">
            Phase 3b, Pacita Complex 1, Block 1, Lot 57 Macaria Drive, San Pedro, Laguna
          </ul>
        </div>

        {/* Column 2: Company Information */}
        <div className="flex-1">
          <h3 className={ListHeader}>Company</h3>
          <ul className={ListClass}>
            <li><a href="/about-us" className={LinkItems}>About Us</a></li>
            <li><a href="/careers" target="_blank" rel="noopener noreferrer" className={LinkItems}>Careers{<GoArrowUpRight className={goAUR}/>}</a></li>
            <li><a href="/contact" target="_blank" rel="noopener noreferrer" className={LinkItems}>Contact{<GoArrowUpRight className={goAUR}/>}</a></li>
          </ul>
        </div>

        {/* Column 3: Help Section */}
        <div className="flex-1">
          <h3 className={ListHeader}>Help</h3>
          <ul className={ListClass}>
            <li><a href="/customer-service" target="_blank" rel="noopener noreferrer" className={LinkItems}>Customer Service{<GoArrowUpRight className={goAUR}/>}</a></li>
            <li><a href="/return-policy" className={LinkItems}>Return Policy</a></li>
            <li><a href="/shipping-info" target="_blank" rel="noopener noreferrer" className={LinkItems}>Shipping Info{<GoArrowUpRight className={goAUR}/>}</a></li>
          </ul>
        </div>

        {/* Column 4: FAQ Section */}
        <div className="flex-1">
          <h3 className={ListHeader}>FAQ</h3>
          <ul className={ListClass}>
            <li><a href="/shipping-questions" target="_blank" rel="noopener noreferrer" className={LinkItems}>Shipping Questions{<GoArrowUpRight className={goAUR}/>}</a></li>
            <li><a href="/order-issues" target="_blank" rel="noopener noreferrer" className={LinkItems}>Order Issues{<GoArrowUpRight className={goAUR}/>}</a></li>
            <li><a href="/product-info" className={LinkItems}>Product Info</a></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Section */}

      <footer className="bg-white text-[#6C7173] flex flex-col justify-center items-center text-center sm:text-[.7rem] xs:text-[0.6rem] px-4 py-2">
        <p>
          Powered by: {" "}
          <a href="https://www.5lsolutions.com"
            target='_blank'
            rel='noopener noreferrer'
            className="text-[#f8443c] font-bold hover:text-[#d7322d] transition-colors duration-300">
            5L Solutions
          </a>
        </p>
        <p>&copy; {currentYear} 5L Solutions Supply & Allied Services Corp., All Rights Reserved.</p>

      </footer>
    </div>
  );
};

export default Footer;
