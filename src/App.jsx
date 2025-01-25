import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
    import Login from '../components/Login';
    import OrgChartEditor from './components/OrgChartEditor';
    import AgentGenerator from './components/AgentGenerator';
    import ExportPage from './components/ExportPage';

    function App() {
      return (
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/org-chart" element={<OrgChartEditor />} />
            <Route path="/agents" element={<AgentGenerator />} />
            <Route path="/export" element={<ExportPage />} />
          </Routes>
        </Router>
      );
    }

    export default App;
