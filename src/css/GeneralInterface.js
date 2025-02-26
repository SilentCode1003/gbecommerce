import staticbg from "../assets/images/backdrop.jpg";
import hero4 from '../assets/images/hero4.jpg';


// import {  } from '../css/GeneralInterface';
// export const NBContainer  = "bg-red-700 text-white z-4000 shadow-lg shadow-gray-400 fixed top-0 left-0 w-full px-6 sm:px-6 sm:py-2 lg:px-8";
// export const NBContainer = "bg-red-700 text-white z-4000 shadow-md shadow-gray-400 fixed top-0 left-0 w-full px-6 sm:px-6 sm:py-2 lg:px-8 shadow-md shadow-black-700";



// ============== Navbar ==============
// export const NBContainer = "bg-red-700  text-white z-4000 shadow-md shadow-gray-400 mx-auto px-6 sm:px-6 sm:py-2 xs:px-6 xs:py-2 lg:px-8 shadow-md shadow-black-700";
export const NBContainer = "bg-red-700  text-white z-4000 shadow- mx-auto px-6 sm:px-6 sm:py-2 xs:px-6 xs:py-2 lg:px-8 shadow-md shadow-black-700";
export const NBnavLinkClasses = 'text-white font-sans font-bold transition-colors duration-1000 hover:underline hover:text-white underline-offset-[6px] decoration-[2.4px] lg:text-[1rem] sm:text-[0.9rem]';
export const NBBurgerLinks = 'text-black font-sans font-bold transition-colors duration-300 hover:underline underline-offset-[6px] decoration-[2.4px] hover:text-red-600 md:text-[1rem] sm:text-[0.9rem]';
export const NBSpanDivider = 'text-[#f8443c] text-[1.2rem] font-bold';


// ============== HomePage ==============
// export const HeroTextstyle = "relative text-white text-center";
// export const HeroImageStyle = {
//      backgroundImage: `url(${hero4})`,
//         backgroundPosition: 'center',
//         backgroundSize: 'cover', 
//         backgroundRepeat: 'no-repeat',
//         paddingTop: '36.36%', 
//         position: 'relative',
// };
export const HeroImageStyle = {
  backgroundPosition: 'center',
backgroundSize: 'cover', // Ensures the full image fits without cropping  1q1
  backgroundRepeat: 'no-repeat',
  height: '100%', // Adjust height as needed
  width: '100%', // Adjust width as needed
  marginleft: '100px', // Add padding on the left
  marginright: '20px', // Add padding on the right
  position: 'relative',
};


export const HeroTextContainer = "xs:h-[auto] xs:w-[18rem] sm:h-[auto] sm:w-[23rem] md:w-[30rem] lg:w-[40rem] absolute p-[40px] bg-black bg-opacity-85 rounded-[20px] xs:rounded-[10px]";

export const HeroContainerStyle = { 
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

export const HomepageDivider = "border-[0.5px] border-gray-200 bg-black mt-9";



// ============== All Products Page / CARDS ==============
export const CardContainer =
  "bg-white  border border-gray-200 pb-[rem] flex flex-col items-start shadow-sm rounded transition-shadow duration-300 hover:border-red-500 hover:border-[1.5px] hover:shadow-[0px_4px_10px_rgba(0,0,0,0.3)] overflow-hidden";
  // export const CardContainer =
  // "lg:w-[9rem] md:w-[8rem] sm:w-[10rem] bg-red-100 border border-gray-200 pb-2 flex flex-col items-center shadow-sm rounded transition-shadow duration-300 hover:border-red-500 hover:border-[1.5px] hover:shadow-[0px_4px_10px_rgba(0,0,0,0.3)] overflow-hidden";

// export const CardContainer = "lg:w-[11rem] md:w-[10rem] sm:w-[10rem] bg--100 border border-gray-200 pb-2 flex flex-col items-center shadow-sm rounded transition-shadow duration-300 hover:border-red-500 hover:border-[1.5px] hover:shadow-[0px_4px_10px_rgba(0,0,0,0.3)] overflow-hidden";
export const CardImage = "w-full h- object-cover mb-1 border-b-[] border-grey-100 rounded-t-[1px]";
export const PaginationLRButton = 'px-3 py-1 rounded-md bg-red-700 text-white text-sm font-medium ;'



// ============== Cart Page & Account Page ==============
export const PopupBG = "bg-black bg-opacity-60 fixed inset-0 flex items-center justify-center z-50 ";
export const PopupContainer = "bg-white rounded-[15px] shadow-lg"
export const CSAccount = "bg-white border border-[#CCCCCC] rounded-[20px] shadow-[0px_4px_10px_rgba(0,0,0,0.2)]";
export const CScart = "bg-white z-3000 border border-[#CCCCCC] flex flex-col w-full lg:w-1/2 p-[25px] rounded-[20px] shadow-[0px_4px_10px_rgba(0,0,0,0.2)]";
export const backdropStyle = {
    backgroundImage: `url(${staticbg})`,
    backgroundColor: "rgba(255, 255, 255, 0.96)",
    backgroundBlendMode: "overlay",
  };
  

// ============== Footer ==============                         <div className={`${PopupContainer} p-6 w-[90%] max-w-sm`} >

export const ListClass = "space-y-2 text-center md:text-left"; 
export const ListHeader = "text-white text-[1.8rem] font-bold mb-4 text-black text-center md:text-left underline underline-offset-4 decoration-[#f8443c]";
export const LinkItems = 'bg--400 text-[#e2e1e1] font-sans transition-colors duration-300 hover:underline hover:underline-offset-[5px] text-[1rem] hover:text-[#f8443c] inline-flex items-center';
 