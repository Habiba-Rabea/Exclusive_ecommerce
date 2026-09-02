import React from 'react';
import AppRoutes from './routes/AppRoutes';
import Navbar from './Components/Layout/Navbar'; 
import Footer from './Components/Layout/Footer';
function App() {
  return (
    <div>
      <main>
        <Navbar/>
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}
export default App;