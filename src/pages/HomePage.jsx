import React, { useState, useEffect } from 'react';
import NewProducts from '../components/NewProducts';
import Carousel from '../components/CarouselComponent';
import Footer from '../components/Footer';
import hero1 from "../assets/images/hero1.jpg";
import hero3 from "../assets/images/hero3.jpg";
import showcasebw from "../assets/images/showcasebw.png";
import '../css/index.css';
import { HomepageDivider } from '../css/GeneralInterface';
import { Button, Checkbox } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const ShowcaseBG = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
const ShowcaseContainer = "relative bg- p-4 w-[50rem] max-w-3xl rounded-lg ";

const MODAL_HIDE_DURATION = 10000; // 10 seconds

const HomePage = () => {
  const [showErrorModal, setShowErrorModal] = useState(true);
  // const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    const lastClosedTime = localStorage.getItem('modalClosedAt');
    // const dontShow = localStorage.getItem('dontShowAgain');

    // if (dontShow === "true") {
    //   setShowErrorModal(false);
    //   return;
    // }

    if (lastClosedTime) {
      const elapsedTime = Date.now() - parseInt(lastClosedTime, 10);
      if (elapsedTime < MODAL_HIDE_DURATION) {
        setShowErrorModal(false);
        setTimeout(() => setShowErrorModal(true), MODAL_HIDE_DURATION - elapsedTime);
      }
    }
  }, []);

  const handleCloseModal = () => {
    setShowErrorModal(false);
    localStorage.setItem('modalClosedAt', Date.now().toString());

    if (dontShowAgain) {
      localStorage.setItem('dontShowAgain', "true");
    } else {
      setTimeout(() => setShowErrorModal(true), MODAL_HIDE_DURATION);
    }
  };

  return (
    <div className="pt-5">
      {showErrorModal && (
        <div className={ShowcaseBG}>
          <div className={ShowcaseContainer}>
            <Button className="absolute top-2 right-2" shape="circle" onClick={handleCloseModal}>
              <CloseOutlined />
            </Button>
            <img src={showcasebw} alt="Showcase" className="w-full object-cover mb-4 rounded" />
            
            {/* Checkbox */}
            {/* <div className="flex items-center justify-center mt-2">
              <Checkbox onChange={(e) => setDontShowAgain(e.target.checked)}>
                Don’t show this again
              </Checkbox>
            </div> */}
          </div>
        </div>
      )}
      {/* <div className="bg-black text-white border border-black mb-2 h-[3rem]"></div> */}
      <Carousel />
      <div className="bg-black text-white border border-black mb-2 h-[3rem]"></div>
      <NewProducts isHome={true} />
      <div className={HomepageDivider}></div>
      <NewProducts isHome={true} />
      <div className={HomepageDivider}></div>
      <Footer />
    </div>
  );
};

export default HomePage;
