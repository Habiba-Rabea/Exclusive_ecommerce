import { Link } from 'react-router-dom';
import Breadcrumb from '../../Components/Common/Breadcrumb';
export default function NotFound() {
  return (
    <section className="py-5 my-5">
      <div className="container">
        
        <div className="mb-5">
            <Breadcrumb items={[
                { name: "Home", link: "/" },
                { name: "404 Error" }
            ]}  />
        </div>

        <div className="text-center py-4 py-md-5">
          <h1 className="fw-600 mb-4" style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)', letterSpacing: '2px' }}>
            404 Not Found
          </h1>
          
          <p className=" mb-5 fs-6 fw-500"> Your visited page not found. You may go home page.</p>

          <Link to="/" className="btn text-white px-4 py-3 rounded-1 fw-medium text-decoration-none d-inline-block"
            style={{ backgroundColor: '#DB4444' }}>
            Back to home page
          </Link>
        </div>

      </div>
    </section>
  );
}