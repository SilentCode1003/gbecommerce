import React from 'react';
import { FaEnvelope } from 'react-icons/fa'; // Importing an icon
import '../css/Newsletterstrip.css';

const Footer = () => {
  return (
    // <div className="footercontainer mb-[5rem]">
            <div className="footercontainer sm:mb-[5rem]">

      <div className="footer-col ">
        <p className='newslettertext'>STAY UP-TO-DATE ON OUR LATEST OFFERS</p>
      </div>
      <div className="footer-col newsletterbox">
        <div className="input-container">
          <FaEnvelope className="input-icon" />
          <input type="email" placeholder="Enter your email" className="footer-input" />
        </div>
        <button className="footer-button">Subscribe to Newsletter</button>
      </div>
    </div>
  );
};

export default Footer;

// import React from 'react';
// import { FaEnvelope } from 'react-icons/fa'; // Importing an icon

// const Footer = () => {
//   return (
//     <div className="bg-black text-white flex flex-col md:flex-row justify-between items-center p-5 md:p-20 rounded-[20px] mx-10 my-4 gap-12 md:gap-20">
//       <div className="flex-1 flex justify-center md:justify-start items-center">
//         <p className="sm:text-[1.25rem] text-[1.5rem] md:text-[2rem] lg:text-[3rem] font-bold text-left">
//           STAY UP-TO-DATE ON OUR LATEST OFFERS
//         </p>
//       </div>

//       <div className="flex-1 flex flex-col items-center md:items-end gap-4 w-full">
//         <div className="relative w-full">
//           {/* Adjusted envelope icon for proper alignment */}
//           <FaEnvelope className="absolute left-[15px] top- transform -translate-y-1/2 text-gray-400" />
//           <input
//             type="email"
//             placeholder="Enter your email"
//             className="bg-gray-100 text-black p-3 pl-14 rounded-full w-full border border-transparent focus:border-gray-600 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition duration-300 hover:border-red-500"
//           />
//         </div>

//         <button className="bg-gray-300 text-black font-bold py-2 px-6 rounded-full transition duration-300 hover:bg-white hover:border-white hover:shadow-lg hover:scale-105">
//           Subscribe to Newsletter
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Footer;
