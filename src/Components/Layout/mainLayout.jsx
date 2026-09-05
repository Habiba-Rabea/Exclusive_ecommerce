import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx'; // حسب مسار الـ Navbar عندك
import Footer from './Footer.jsx';

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;