import Header from "./components/Header";
import Footer from "./components/Footer"
// Pages
import Home from "./Pages/Home"
import FormRegister from "./Pages/FormRegister"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/Inicio" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/FormRegister" element={<FormRegister />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
