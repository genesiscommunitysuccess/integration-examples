import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home/Home';
import ChartComponentInLayout from './pages/ChartComponentInLayout/ChartComponentInLayout';
import SimpleChartInLayout from './pages/SimpleChartInLayout/SimpleChartInLayout';
import ConditionalChartComponentInLayout from './pages/ConditionalChartComponentInLayout/ConditionalChartComponentInLayout';
import DynamicChartComponentInLayout from './pages/DynamicChartComponentInLayout/DynamicChartComponentInLayout';
const CurrentPageComponent = () => {
  const location = useLocation();

  let pageComponent;

  switch (location.pathname) {
    case '/simple-chart-in-layout':
      pageComponent = <SimpleChartInLayout />;
      break;
    case '/chart-component-in-layout':
      pageComponent = <ChartComponentInLayout />;
      break;
    case '/conditional-chart-component-in-layout':
      pageComponent = <ConditionalChartComponentInLayout />;
      break;
    case '/dynamic-chart-component-in-layout':
      pageComponent = <DynamicChartComponentInLayout />;
      break;
    default:
      pageComponent = <HomePage />;
  }

  return (
    <>
      {pageComponent}
    </>
  );
}

const CustomLink = ({ to, children }) => {
  const location = useLocation();

  const isActive = location.pathname === to;
  
  return isActive ? (
    <rapid-button disabled>{children}</rapid-button> 
  ) : (
    <Link to={to}>
      <rapid-button>{children}</rapid-button>
    </Link> // Active link
  );
}

const Navigation: React.FC = () => {
  return (
    <nav>
      <CustomLink to="/">Home</CustomLink>
      <CustomLink to="/simple-chart-in-layout">Simple Chart</CustomLink>
      <CustomLink to="/chart-component-in-layout">Chart Component</CustomLink>
      <CustomLink to="/conditional-chart-component-in-layout">Conditional chart Component</CustomLink>
      <CustomLink to="/dynamic-chart-component-in-layout">Dynamic chart Component</CustomLink>
    </nav>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Navigation />
      <rapid-design-system-provider style={{ width: '100%', height: '100%', display: 'flex'}}>
        <Routes>
          <Route path="*" element={<CurrentPageComponent />} />
        </Routes>
      </rapid-design-system-provider>
    </Router>
  );
}

export default App;
