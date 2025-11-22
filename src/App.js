import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import GetStartedPage from "./pages/GetStartedPage/GetStartedPage";
import AboutUs from "./pages/AboutUs/AboutUs";
import Advertising from "./pages/Advertising/Advertising";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/get-started" element={<GetStartedPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/advertising" element={<Advertising />} />
      </Routes>
    </Router>
  );
}

export default App;
