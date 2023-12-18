import './AuthMockPage.css';
import { useNavigate  } from 'react-router-dom';
import { authService } from '../../services/auth.service';

const AuthMockPage = () => {
    const navigate = useNavigate();
    const mockAuth = (): void => {
        authService.login().then((result) => {
            if (result) {
              navigate('/protected');
            } else {
              alert('Authentication failed!');
            }
          }
        );
      }
    return (
        <section>
        <h2>Auth</h2>
            <zero-button onClick={mockAuth}>Mock auth</zero-button>
        </section>
    );
};

export default AuthMockPage;
