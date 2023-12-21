import { useEffect } from 'react';
import styles from './AuthMockPage.module.css';
import { useNavigate  } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import { authService } from '../../services/auth.service';

const AuthMockPage = () => {
  const { user, setUser } = useAuth();

    const navigate = useNavigate();
    const mockAuth = async () => {
      const isUserAuthenticated = await authService.login();

      if (isUserAuthenticated) {
        const user = {
          authorized: isUserAuthenticated
        };
  
        setUser(user);
      } else {
        alert('Login failed')
      }
    };
    useEffect(() => {
      if (user?.authorized) {
        navigate('/protected');
      }
    }, [user]);

    return (
      <section className={styles.AuthMockPage}>
        <h2>Auth</h2>
        <zero-button onClick={mockAuth}>Mock auth</zero-button>
      </section>
    );
};

export default AuthMockPage;
