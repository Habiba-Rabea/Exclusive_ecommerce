import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../../Components/UI/Inputs'; 
import * as zod from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../Context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login, currentUser, usersList = [] } = useAuth();

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
    const enteredEmail = userData.email.trim().toLowerCase();

    const foundUser = usersList.find(
      (user) => user.email?.trim().toLowerCase() === enteredEmail && user.password === userData.password
    );

    if (foundUser) {
      login(foundUser);
      navigate('/account');
    } else {
      setError('root', { message: 'Invalid email or password' });
    }
  }

  return (
    <section 
      className="d-flex align-items-center justify-content-center" 
      style={{ 
        minHeight: 'calc(100vh - 180px)', 
        padding: '120px 20px 80px 20px',
        backgroundColor: '#f9f9f9'
      }}
    >
      {/* Box with Red Shadow */}
      <div 
        style={{ 
          width: '100%', 
          maxWidth: '450px',
          backgroundColor: '#ffffff',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(219, 68, 68, 0.25)',
          border: '1px solid rgba(219, 68, 68, 0.15)',
          boxSizing: 'border-box'
        }}
      >
        <h2 className="fw-600 mb-2 text-center" style={{ fontSize: '30px' }}>Log in to Exclusive</h2>
        <p className="mb-4 text-muted text-center fs-6">Enter your details below</p>
        
        <form onSubmit={handleSubmit(submitForm)}>
          {formState.errors.root && (
            <p className="text-danger py-2 mb-3 text-center fs-6">
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

          <div className="d-flex align-items-center justify-content-between mb-3 mt-4">
            <button
              type="submit"
              className="btn text-white py-2 px-4 rounded-2 fw-600"
              style={{ 
                backgroundColor: '#DB4444', 
                boxShadow: '0 4px 12px rgba(219, 68, 68, 0.3)' 
              }}
            >
              Log In
            </button>
            
            <Link
              to="/forgot-password"
              style={{ color: '#DB4444' }}
              className="text-decoration-none fw-500 fs-6"
            >
              Forget Password?
            </Link>
          </div>
        </form>

        <div className="mt-4 pt-2 text-center text-secondary fs-6">
          <span>Don't have an account? </span>
          <Link to="/signup" style={{ color: '#DB4444' }} className="text-decoration-none fw-600 ms-1">
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
}