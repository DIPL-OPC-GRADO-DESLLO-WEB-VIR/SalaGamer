import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer"
// Pages
import Home from "./Pages/Home"
import LoginPage from "./Pages/LoginPage"
import FormRegister from "./Pages/FormRegister"
import HomePerfilPage from './Pages/HomePerfilPage';
import CrearProductoPage from './Pages/CrearProductoPage';
import PremiosPage from './Pages/PremiosPage';
import UpdatePremiosPage from './Pages/UpdatePremiosPage';
import 'bootstrap/dist/css/bootstrap.min.css';
// import REACT_APP_API_URL from ".env"
import { BrowserRouter, Route, Routes, Redirect } from "react-router-dom";
const token = localStorage.getItem('token');
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header token={token} />
        <Routes>
          <Route path="/Inicio" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/FormRegister" element={<FormRegister />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/HomePerfilPage" element={<HomePerfilPage />} />
          <Route path="/CrearProductoPage" element={<CrearProductoPage />} />
          <Route path="/PremiosPage" element={<PremiosPage />} />
          <Route path="/UpdatePremiosPage/:id" element={<UpdatePremiosPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
