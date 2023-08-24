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
import PlayerPage from './Pages/PlayerPage';
import AwardxPlayer from './Pages/AwardxPlayer';
import AwardclaimedPage from './Pages/Award_claimedPage';
import HoursexpirePage from './Pages/Hours_expirePage';
import 'bootstrap/dist/css/bootstrap.min.css';
// import REACT_APP_API_URL from ".env"
import { BrowserRouter, Route, Routes, Redirect } from "react-router-dom";
const token = localStorage.getItem('token');
function App() {
  return (
    <>
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
            <Route path="/AwardclaimedPage/:id" element={<AwardclaimedPage />} />
            <Route path="/HoursexpirePage/:id" element={<HoursexpirePage />} />
            <Route path="/AwardxPlayer/:id/:hour/:name" element={<AwardxPlayer />} />
            <Route path="/PlayerPage" element={<PlayerPage />} />
          </Routes>

        </BrowserRouter>

      </div>
      <Footer />
    </>

  );
}

export default App;
