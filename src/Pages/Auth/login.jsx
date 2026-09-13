import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginImg from '../../assets/Images/signup/Side Image.png';
import InputField from '../../Components/UI/Inputs'; 
import * as zod from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../Context/AuthContext';
import { useLocalStorage } from '../../Hooks/useLocalStorage';
export default function Login() {
  const navigate = useNavigate();
  const { login, currentUser } = useAuth();
  const [usersList] = useLocalStorage('users', []);
  useEffect(() => {
    if (currentUser) {
      navigate('/account');
    }
  }, [currentUser, navigate]);
  const loginSchema = zod.object({
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
      email: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(loginSchema),
  });
  function submitForm(userData) {
    const foundUser = usersList.find(
      (user) => user.email === userData.email && user.password === userData.password
    );
    if (foundUser) {
      login(foundUser);
      navigate('/account');
    } else {
      setError('root', { message: 'Invalid email or password' });
    }
  }
  return (
    <section className="py-5 mt-4">
      <div className="container-fluid px-0 overflow-hidden">
        <div className="row g-0 align-items-center">
          <div className="col-12 col-md-6 d-none d-md-block ps-0">
            <div style={{ maxWidth: '550px' }}>
              <img
                src={loginImg}
                alt="Shopping Cart and Mobile"
                className="img-fluid w-100 object-fit-contain"
              />
            </div>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-center justify-content-lg-start ps-md-4 pe-xl-5">
            <div className="w-100 ms-lg-5" style={{ maxWidth: '400px' }}>
              <h2 className="fw-600 mb-2">Log in to Exclusive</h2>
              <p className="mb-4 fs-6">Enter your details below</p>
              <form onSubmit={handleSubmit(submitForm)}>
                {formState.errors.root && (
                  <p className="text-danger py-2 mb-2 fs-6">
                    {formState.errors.root.message}
                  </p>
                )}
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
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <button
                    type="submit"
                    className="btn text-white py-2 px-4 rounded-1 fw-600"
                    style={{ backgroundColor: '#DB4444' }}
                  >
                    Log In
                  </button>
                  <Link
                    to="/forgot-password"
                    style={{ color: '#DB4444' }}
                    className="text-decoration-none"
                  >
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