import { NavLink } from 'react-router-dom';
import SampleImage from '../assets/images/AVRG750LCD_F-1024x1024.jpg';
import Rating from '/src/components/Rating.jsx';
import'../css/AllProduct.css'

const NewProduct = ({ Product = {} }) => {
  const { imageUrl, type: ProductType, title: ProductTitle } = Product;

  return (
    <div className="bg-white rounded-xl w-full custom-breakpoint:w-custom-sm md:w-custom-md lg:w-custom-lg xl:w-custom-xl shadow-lg hover:shadow-xl transition-all duration-300 relative">
      <div className="p-4">
        
        {imageUrl && (
          <div className="mb-2 border-gray-100 flex justify-center items-center">
            <img src={SampleImage} alt={ProductTitle} className="w-full h-auto rounded-lg" />
          </div>
        )}

        <div className="mb-2">
          <div className="text-gray-600 text-sm">{ProductType}</div>
          <h3 className="text-lg font-bold">{ProductTitle}</h3>
        </div>

        <Rating />

        <div className="border border-gray-100 mb-5 mt-10"></div>

        <div className="flex flex-col md:flex-row justify-between mb-4">
          <NavLink
            to={`/jobs/`}
            className="h-9 bg-black hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-center text-xs md:text-sm"
          >
            Read More
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
