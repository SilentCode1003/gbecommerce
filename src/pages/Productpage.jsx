import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import '../css/AllProducts.css';
import products from '../products.json';
import Counter from '../components/Counter';
import ProductTab1 from '../components/ProductTab1';
import ProductTab2 from '../components/ProductTab2';
import ProductTab3 from '../components/ProductTab3';
import Footer from '../components/Footer';
import { Image, Breadcrumb, Rate, notification, Skeleton, Tag, Divider, Space } from "antd";
import {  LeftOutlined,  RightOutlined, UndoOutlined,  ZoomInOutlined,  ZoomOutOutlined} from '@ant-design/icons';


const CART_KEY = 'quoteItems'; // Key for localStorage

const Productpage = () => {
  <Skeleton />;
  const { id } = useParams();
  const location = useLocation();
  const Product = location.state?.product || products.find((Product) => Product.id === id);
  const [selectedImage, setSelectedImage] = useState(Product?.images[0] || '');
  const [isExpanded, setIsExpanded] = useState(true);
  const [quoteItems, setQuoteItems] = useState([]);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImage(Product?.images[0]);


    const savedItems = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    setQuoteItems(savedItems);
  }, [Product]);

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
      }, 100);
    }
  };

  const [api, contextHolder] = notification.useNotification();
  const addToQuote = () => {
    if (quantity > 0) {
      const existingItemIndex = quoteItems.findIndex((item) => item.id === Product.id);
      if (existingItemIndex === -1) {
        const updatedItems = [...quoteItems, { ...Product, quantity }];
        setQuoteItems(updatedItems);
        localStorage.setItem(CART_KEY, JSON.stringify(updatedItems));
      } else {
        const updatedItems = [...quoteItems];
        updatedItems[existingItemIndex].quantity += quantity;
        setQuoteItems(updatedItems);
        localStorage.setItem(CART_KEY, JSON.stringify(updatedItems));
      }
    } else {
    }
  };

  const openNotification = () => {
    const key = `open${Date.now()}`;
    const closeNotification = () => api.destroy(key);

    api.success({
      message: "Added to Quote",
      description: `You have added ${quantity} ${Product?.title} to your quote.`,
      className: 'bg- text-white',
      // btn,
      key,
      onClose: closeNotification,
    });
  };
  const ErrorNotification = () => {
    api.warning({
      message: 'Notification Title',
      description:
        'Quantity is below the minimum quantity of 1. Please add more to proceed.',
      className: 'bg text-white',
      // duration: 0,// to remove timer
    });
  };


  if (!Product) {
    return <div className="text-center text-gray-500">Product Not Found</div>;
  }

  const renderContent = () => {
    return (
      <div className={`transition-all duration-500 ease-in-out transform ${transitioning ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}>
        {activeTab === 'tab1' && (
          <ProductTab1 />
        )}
        {activeTab === 'tab2' && (
          <ProductTab2 />
        )}
        {activeTab === 'tab3' && (
          <ProductTab3 />
        )}
      </div>
    );
  };

  return (
    <div className="bg-[#f5f5f5]">
      {contextHolder}
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
      <div className='mlg:mx-10 md:mx-10 sm:mx-5 xs:mx-5 lg:mx-10 grid grid-cols gap-5'>
        <div className="bg-white flex px-7 py-6 flex-col items-center gap-5 lg:flex-row lg:gap-10 lg:items-start justify-center">
          {/* Left side (Images) */}
          <div className="flex gap-4 ">
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
              <Image.PreviewGroup
                items={Product.images} // Ensure Product.images is an array of URLs
                preview={{
                  current: Product.images.indexOf(selectedImage), // Active image index
                  onChange: (index) => setSelectedImage(Product.images[index]), // Update selected image on change
                  toolbarRender: (
                    _,
                    {
                      transform: { scale },
                      actions: { onActive, onZoomOut, onZoomIn, onReset },
                    }
                  ) => (
                    <Space size={12} className="toolbar-wrapper">
                      <LeftOutlined onClick={() => onActive?.(-1)} />
                      <RightOutlined onClick={() => onActive?.(1)} />
                      <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                      <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                      <UndoOutlined onClick={onReset} />
                    </Space>
                  ),
                }}
              >
                <Image
                  src={selectedImage}
                  alt="Main Image"
                  className="w-full max-w-xs lg:max-w-lg h-auto rounded-xl border border-gray-200 object-cover shadow-sm transition-all duration-300 ease-in-out hover:shadow-red-400"
                />
              </Image.PreviewGroup>



            </div>
          </div>

          {/* Right side (Text Content) */}
          <div className="w-full lg:w-1/2 max-w-2xl pt-5 px-6">
            <h1 className="text-xl text-gray-500 font-semibold">{Product.type}</h1>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">{Product.title}</h2>
            <Rate disabled allowHalf defaultValue={2.5} />
            <Divider />

            {/* Description with Read More */}
            <div className="relative bg--100 overflow-hidden transition-all duration-300 ease-in-out min-h-[72px]  ">
              <p className={`text-sm lg:text-base text-gray-600 leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
                {Product.description}
              </p>
              <button
                className="text-sm lg:text-base font-bold text-blue-600 transition-all duration-300 ease-in-out"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? 'Read Less' : 'Read More'}
              </button>
            </div>

            {/* <div className="border-t border-gray-200 my-4"></div> */}
            <Divider />
            {/* Tags Section */}
            <div className="flex flex-wrap gap-1 items-center">
              {/* <Tag className="h-7 flex items-center">{Product.topology}</Tag> */}
              <Tag>{Product.topology}</Tag>
              <Tag>{Product.waveform}</Tag>
              <Tag>{Product.communication}</Tag>
              <Tag>{Product.data_line_protection}</Tag>
              <Tag>{Product.management_software}</Tag>
            </div>
            <Divider />

            {/* Counter & Button */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <Counter onQuantityChange={setQuantity} />
              <button
                className="bg-[#E63535] text-white font-bold text-lg py-3 px-4 rounded-xl shadow-lg transition-colors duration-300 ease-in-out hover:bg-[#E84646] focus:outline-none focus:ring-4 focus:ring-blue-300"
                type='success'
                onClick={() => {
                  if (quantity <= 0) {
                    ErrorNotification();
                  } else {
                    addToQuote();
                    openNotification();
                  }
                }}
              >
                Add to Quote
              </button>
            </div>
          </div>

        </div>

        <div className="bg-white h-[30rem] py-2">
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
            <div className="p-4 overflow-auto max-h-96">
              {renderContent()}
            </div>
          </div>
        </div>


      </div>
      <Footer />
    </div >
  );
};

export default Productpage;
