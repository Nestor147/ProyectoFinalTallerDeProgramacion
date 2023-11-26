




import React, { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Home from './Home'
import UserPage from '../../components/usersRegister/templates/UserPage'

import './Dashboard.css'
import ReservasPage from '../../components/Reservas/templates/ReservasPage'
import PrestamoPage from '../../components/Prestamos/templates/PrestamosPage'
import CalificionPage from '../../components/Calificaciones/templates/CalificacionPage'
import LibroPage from '../../components/Libro/templates/LibroPage'


const Dashboard = () => {
  const [openSideBardToggle,setOpenSideBardToggle]=useState(false)
  const [currentPage, setCurrentPage] = useState('Home');

  const OpenSidebar=()=>{
    setOpenSideBardToggle(!openSideBardToggle)
  }
  const cambiarPagina = (nuevaPagina) => {
    setCurrentPage(nuevaPagina);
  };


  return (
    <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar}/>
        <Sidebar openSideBardToggle={openSideBardToggle} OpenSidebar={OpenSidebar} cambiarPagina={cambiarPagina}/>
          {/* Renderizar el componente según la página actual */}
      {currentPage === 'Home' && <Home />}
      {currentPage === 'UserPage' && <UserPage />}
      {currentPage === 'reservaPage' && <ReservasPage />}
      {currentPage === 'prestamoPage' && <PrestamoPage />}
      {currentPage === 'calificacionPage' && <CalificionPage />}
      {currentPage === 'libroPage' && <LibroPage />}
        </div>
  )
}

export default Dashboard