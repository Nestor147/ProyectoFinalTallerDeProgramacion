import Registrase from "./Auth/Registrarse.jsx";
// import RegisterUsers from "./Pages/RegisterUsers.jsx";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from "./Auth/Login.jsx";
import Home from "./Pages/Home/Home.jsx";
import Dashboard from "./Pages/Home/Dashboard.jsx";
import UserPage from './components/usersRegister/templates/UserPage.js';
import './App.css'
import ReservasPage from "./components/Reservas/templates/ReservasPage.js";
import PrestamoPage from "./components/Prestamos/templates/PrestamosPage.js";
import CalificionPage from "./components/Calificaciones/templates/CalificacionPage.js";
import LibroPage from "./components/Libro/templates/LibroPage.js";


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/home" element={<Home/>}></Route>

        <Route path="/usuarios" element={<UserPage/> }></Route>
        <Route path="/reservas" element={<ReservasPage/>}></Route>
        <Route path="/prestamos" element={<PrestamoPage/>}></Route>
        <Route path="/calificaciones" element={<CalificionPage/>}></Route>
        <Route path="/libros" element={<LibroPage/>}></Route>

        <Route path="/registrarse" element={<Registrase/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
      </Routes>
  
    </BrowserRouter>
  );
}

export default App;
