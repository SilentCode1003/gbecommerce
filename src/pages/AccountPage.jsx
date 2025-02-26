import React from 'react'
import ProfileForm from '../components/ProfileForm'
import Loginwidget from '../components/Loginwidget'
import Footer from '../components/Footer'
import { Breadcrumb } from "antd";
import { backdropStyle } from '../css/GeneralInterface';
import { FaCoffee } from "react-icons/fa";
import Adstrip from '../components/AdStrip'


const breadcrumbPaths = [
  { name: 'Home', link: '/' },
  { name: 'Account', link: '/AccountPage' },
];

const AccountPage = () => {
  return (

    <div className="flex flex-col min-h-screen bg-fixed bg-center"
      style={backdropStyle}
    >
      <Adstrip />

      <Breadcrumb className="bg--200 px-10 pt-10 pb-4 text-sm text-gray-400"
        separator=">"
        items={[
          {
            title: <a href="/">Home</a>,
          },
          {
            title: <a href="">Account</a>,
          },
          {
            title: <a href="">Login</a>,
          },

        ]}
      />
      {/* <ProfileForm /> */}
      <Loginwidget />
      <Footer classname='' />
    </div>
  )
}

export default AccountPage
