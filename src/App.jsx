
import { ThemeProvider } from '@mdsol/onex-design';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from './common/LandingPage';
import '@mdsol/onex-design/platform.css';
import '@mdsol/onex-design/themeProvider.css';
import './App.scss';



function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <Router>
            <Routes>
                <Route path='/study/:studyId' element={<LandingPage />} />
                <Route path='/study/:studyId/edit_check/:ecId' element={<LandingPage />} />
            </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
