import Header from "./components/Header";
import Footer from "./components/Footer"
// Pages
import Home from "./Pages/Home"
import LoginPage from "./Pages/LoginPage"
import FormRegister from "./Pages/FormRegister"
import HomePerfilPage from './Pages/HomePerfilPage';
import 'bootstrap/dist/css/bootstrap.min.css';
// import REACT_APP_API_URL from ".env"
import { BrowserRouter, Route, Routes, Redirect } from "react-router-dom";
const token = localStorage.getItem('token');
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/Inicio" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/FormRegister" element={<FormRegister />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/HomePerfilPage" element={<HomePerfilPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
