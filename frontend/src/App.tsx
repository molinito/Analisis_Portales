import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
//import  Dashboard  from "./components/Dashboard";
import PortalList from "./components/PortalList";
import UsageChart from "./components/UsageChart";
import PortalPieChart from "./components/PortalPieChart";
import BarChartVisits from "./components/BarChatsVisits";
import { PagePrincipal } from "./page/PagePrincipal";

const UsageChartWrapper = () => {
  const location = useLocation();
  const { portals } = location.state || { portals: [] };
  return <UsageChart portals={portals} />;
};

const BarChartVisitsWrapper = () => {
  const location = useLocation();
  const { portals } = location.state || { portals: [] };
  return <BarChartVisits portals={portals} />;
};

const PortalPieChartWrapper = () => {
  const location = useLocation();
  const { portals } = location.state || { portals: [] };
  return <PortalPieChart portals={portals} />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Page principal */}
        <Route path="/" element={<PagePrincipal />} />
         {/* Rutas hacia otros componentes *}
        <Route path="/dashboard" element={<Dashboard />} />*/}
        <Route path="/portals" element={<PortalList />} />
        <Route path="/usage-chart" element={<UsageChartWrapper />} />
        <Route path="/bar-chart-visits" element={<BarChartVisitsWrapper />} />
        <Route path="/portal-pie-chart" element={<PortalPieChartWrapper />} />
      </Routes>
    </Router>
  );
};

export default App;
