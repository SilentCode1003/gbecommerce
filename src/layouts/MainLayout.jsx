import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const MainLayout = () => {
  return (
    <>
      <Navbar classsName="z-4000" />
      <Outlet />
    </>
  )
}

export default MainLayout
 