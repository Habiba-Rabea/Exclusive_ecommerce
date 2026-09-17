import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { registerUser } from '../../APIs/authservice'; // 1. استدعاء دالة الـ API

export default function Signup() {
  const navigate = useNavigate();

  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { name: '', email: '', password: '' },
  });

  // 2. تحويل الدالة لـ async لاستدعاء الـ API
  async function submitForm(userData) {
    try {
      // إرسال البيانات للـ API بدلاً من الـ Local Context
      await registerUser({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });

      // التحويل لصفحة الـ Login بعد نجاح التسجيل
      navigate('/login');

    } catch (error) {
      // إظهار الخطأ الراجع من السيرفر تحت إدخال الإيميل
      setError('email', { 
        type: 'manual',
        message: error.message || 'Registration failed, please try again' 
      });
    }
  }

  return (
    <div style={{ 
      width: '100%', 
      minHeight: 'calc(100vh - 180px)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '140px 20px 80px 20px',
      boxSizing: 'border-box',
      backgroundColor: '#f9f9f9'
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '450px',
        backgroundColor: '#ffffff',
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(219, 68, 68, 0.25)',
        border: '1px solid rgba(219, 68, 68, 0.15)',
        boxSizing: 'border-box'
      }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: '600', 
          marginBottom: '8px', 
          color: '#000',
          textAlign: 'center'
        }}>
          Create an account
        </h1>
        <p style={{ 
          fontSize: '15px', 
          color: '#666', 
          marginBottom: '32px',
          textAlign: 'center'
        }}>
          Enter your details below
        </p>

        <form onSubmit={handleSubmit(submitForm)} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label style={{ fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '6px', display: 'block' }}>
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register('name', { required: 'Name is required' })}
              style={{ 
                width: '100%', 
                padding: '12px 14px', 
                border: errors.name ? '1px solid #DB4444' : '1px solid #ccc', 
                borderRadius: '8px',
                outline: 'none',
                fontSize: '15px',
                boxSizing: 'border-box'
              }}
            />
            {errors.name && <span style={{ color: '#DB4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.name.message}</span>}
          </div>

          <div>
            <label style={{ fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '6px', display: 'block' }}>
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register('email', { 
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
              })}
              style={{ 
                width: '100%', 
                padding: '12px 14px', 
                border: errors.email ? '1px solid #DB4444' : '1px solid #ccc', 
                borderRadius: '8px',
                outline: 'none',
                fontSize: '15px',
                boxSizing: 'border-box'
              }}
            />
            {errors.email && <span style={{ color: '#DB4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.email.message}</span>}
          </div>

          <div>
            <label style={{ fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '6px', display: 'block' }}>
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register('password', { 
                required: 'Password is required',
                pattern: {
                  value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                  message: 'Must be 8+ chars with uppercase, lowercase, number & special char'
                }
              })}
              style={{ 
                width: '100%', 
                padding: '12px 14px', 
                border: errors.password ? '1px solid #DB4444' : '1px solid #ccc', 
                borderRadius: '8px',
                outline: 'none',
                fontSize: '15px',
                boxSizing: 'border-box'
              }}
            />
            {errors.password && <span style={{ color: '#DB4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.password.message}</span>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              backgroundColor: '#DB4444',
              color: '#fff',
              padding: '14px',
              border: 'none',
              borderRadius: '8px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              fontSize: '16px',
              marginTop: '10px',
              opacity: isSubmitting ? 0.7 : 1,
              boxShadow: '0 4px 12px rgba(219, 68, 68, 0.3)'
            }}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', color: '#555', fontSize: '15px' }}>
          <span>Already have account? </span>
          <Link to="/login" style={{ color: '#DB4444', textDecoration: 'none', fontWeight: '600', marginLeft: '6px' }}>
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}