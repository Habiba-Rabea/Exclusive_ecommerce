import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import signupImg from '../../assets/Images/signup/Side Image.png';
import InputField from '../../Components/UI/Inputs'; 
import * as zod from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../Context/AuthContext';
import { useLocalStorage } from '../../Hooks/useLocalStorage';

export default function Sigup() {
  const navigate = useNavigate();
  const { login, currentUser } = useAuth();
  const [usersList, setUsersList] = useLocalStorage('users', []);
  useEffect(() => {
    if (currentUser) {
      navigate('/account');
    }
  }, [currentUser, navigate]);
  const signupSchema = zod.object({
    name: zod
      .string()
      .nonempty('Name is required')
      .min(3, 'Name must be at least 3 characters')
      .max(20, 'Name cannot exceed 20 characters'),

    email: zod
      .string()
      .nonempty('Email is required')
      .email('Enter valid email (e.g. alex@example.com)'),

    password: zod
      .string()
      .nonempty('Password is required')
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        'Must be 8+ chars with uppercase, lowercase, number & special char'
      ),
  });

  const { register, handleSubmit, setError, formState } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(signupSchema),
  });

  function submitForm(userData) {
    const isEmailExists = usersList.some((user) => user.email === userData.email);
    if (isEmailExists) {
      setError('email', { message: 'This email is already registered' });
      return;
    }
    const nameParts = userData.name.trim().split(' ');
    const formattedUser = {
      ...userData,
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || '',
      address: '',
    };
    setUsersList((prevUsers) => [...prevUsers, formattedUser]);
    login(formattedUser);
    navigate('/account');
  }

  return (
    <section className="py-5 mt-5">
      <div className="container-fluid px-0 overflow-hidden">
        <div className="row g-0 align-items-center">
          <div className="col-12 col-md-6 d-none d-md-block ps-0">
            <div style={{ maxWidth: '550px' }}>
              <img
                src={signupImg}
                alt="Shopping Cart and Mobile"
                className="img-fluid w-100 object-fit-contain"
              />
            </div>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-center justify-content-lg-start ps-md-4 pe-xl-5">
            <div className="w-100 ms-lg-5" style={{ maxWidth: '400px' }}>
              <h2 className="fw-600 mb-2">Create an account</h2>
              <p className="mb-4 fs-6">Enter your details below</p>

              <form onSubmit={handleSubmit(submitForm)}>
                <div className="mb-4">
                  <InputField
                    {...register('name')}
                    type="text"
                    placeholder="Name"
                    className="form-control border-0 border-bottom rounded-0 px-0 shadow-none bg-transparent"
                  />
                  {formState.errors.name && formState.touchedFields.name && (
                    <p className="text-danger py-2 mb-0 fs-6">
                      {formState.errors.name?.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <InputField
                    {...register('email')}
                    type="text"
                    placeholder="Email or Phone Number"
                    className="form-control border-0 border-bottom rounded-0 px-0 shadow-none bg-transparent"
                  />
                  {formState.errors.email && formState.touchedFields.email && (
                    <p className="text-danger py-2 mb-0 fs-6">
                      {formState.errors.email?.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <InputField
                    {...register('password')}
                    type="password"
                    placeholder="Password"
                    className="form-control border-0 border-bottom rounded-0 px-0 shadow-none bg-transparent"
                  />
                  {formState.errors.password && formState.touchedFields.password && (
                    <p className="text-danger py-2 mb-0 fs-6">
                      {formState.errors.password?.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn text-white w-100 py-2 mb-3 rounded-1 fw-600"
                  style={{ backgroundColor: '#DB4444' }}
                >
                  Create Account
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100 py-2 mb-4 rounded-1 fw-medium d-flex align-items-center justify-content-center gap-2"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1037_3222)">
                      <path
                        d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3276 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.2401 24.0008Z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.50253 14.3003C4.99987 12.8099 4.99987 11.1961 5.50253 9.70575V6.61481H1.51649C-0.18551 10.0056 -0.18551 14.0004 1.51649 17.3912L5.50253 14.3003Z"
                        fill="#FBBC04"
                      />
                      <path
                        d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50264 9.70575C6.45064 6.86173 9.10947 4.74966 12.2401 4.74966Z"
                        fill="#EA4335"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1037_3222">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Sign up with Google
                </button>

                <div className="text-center text-secondary fs-6">
                  Already have account?
                  <Link
                    to="/login"
                    className="text-dark fw-medium text-decoration-underline ms-3"
                  >
                    Log in
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