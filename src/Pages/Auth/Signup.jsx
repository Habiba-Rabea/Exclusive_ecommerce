import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { useForm } from 'react-hook-form';

export default function Signup() {
  const navigate = useNavigate();
  const { signup, usersList } = useAuth();

  const { register, handleSubmit, setError, formState } = useForm({
    defaultValues: { name: '', email: '', password: '' },
  });

  function submitForm(userData) {
    const isEmailExists = usersList.some((user) => user.email === userData.email);
    if (isEmailExists) {
      setError('email', { message: 'This email is already registered' });
      return;
    }

    const nameParts = userData.name.trim().split(' ');
    const formattedUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || '',
      password: userData.password, 
      address: '',
      addresses: [],
    };

    signup(formattedUser);
    navigate('/account');
  }

  return (
    // باقي كود الـ JSX الخاص بالصفحة
    <form onSubmit={handleSubmit(submitForm)}>
      {/* ... */}
    </form>
  );
}