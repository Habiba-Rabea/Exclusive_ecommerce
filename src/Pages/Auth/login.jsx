
import React from 'react';
import { Link } from 'react-router-dom';
import loginImg from '../../assets/Images/signup/Side Image.png';
import InputField from '../../Components/UI/Inputs'; 

export default function Login() {
  return (
    <section className="py-5">
      <div className="container-fluid px-0 overflow-hidden">
        <div className="row g-0 align-items-center">
          
          <div className="col-12 col-md-6 d-none d-md-block ps-0">
            <div style={{ maxWidth: '550px' }}>
              <img src={loginImg} alt="Shopping Cart and Mobile" className="img-fluid w-100 object-fit-contain" />
            </div>
          </div>

          <div className="col-12 col-md-6 d-flex justify-content-center justify-content-lg-start ps-md-4 pe-xl-5">
            <div className="w-100 ms-lg-5" style={{ maxWidth: '400px' }}>
              <h2 className="fw-600 mb-2">Log in to Exclusive</h2>
              <p className="mb-4 fs-6">Enter your details below</p>

              <form onSubmit={(e) => e.preventDefault()}>

                <div className="mb-4">
                  <InputField 
                    type="text" 
                    placeholder="Email or Phone Number" 
                    className="form-control border-0 border-bottom rounded-0 px-0 shadow-none bg-transparent" 
                  />
                </div>

                <div className="mb-4">
                  <InputField 
                    type="password" 
                    placeholder="Password" 
                    className="form-control border-0 border-bottom rounded-0 px-0 shadow-none bg-transparent" 
                  />
                </div>

                <div className="d-flex align-items-center justify-content-between mb-3">
                  <button type="submit" className="btn text-white py-2 px-4 rounded-1 fw-600"
                    style={{ backgroundColor: '#DB4444' }}>
                    Log In
                  </button>
                  <Link to="/forgot-password" style={{ color: '#DB4444' }} className="text-decoration-none">
                    Forget Password?
                  </Link>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}