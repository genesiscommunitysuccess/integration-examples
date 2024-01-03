import { Link } from 'react-router-dom';
import './AnalyticsPage.css';

const AnaliticsPage = () => {
    return (
        <div className="analitics-page">
            <h1>Analitics Page</h1>
            
            <Link to="/admin">Admin</Link>
        </div>
    );
};

export default AnaliticsPage;
