import React from 'react';
import AppRoutes from './routes/AppRoutes';
import Footer from './Components/Layout/Footer';
function App() {
  return (
    <div>
      <main>
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}
export default App;