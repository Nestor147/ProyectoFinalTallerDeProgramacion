import { Container ,Row,Col, Card, CardHeader, CardBody, Button} from 'reactstrap'
import { TablaPrestamos } from '../organismos/TablePrestamos'
import React, { useState,useEffect } from 'react'
import { ModalPrestamo } from '../organismos/ModalPrestamos'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import { toast, ToastContainer } from "react-toastify/dist/toastify.esm.js";
// import { toast, ToastContainer } from 'react-toastify/dist/inject-style.esm.mjs'

const PrestamoPage = () => {
  const [prestamos,setPrestamos]=useState([])
  const [mostrarModal,setMostrarModal] = useState(false)
  const [editar,setEditar]=useState(null)

  const mostrarPrestamo= async()=>{
    const response = await fetch('https://localhost:7062/Prestamos/')
    if (response.ok){
    const data=await response.json();
    setPrestamos(data)
    }else{
      console.log('Error en la lista')
      }
    }
  useEffect(()=>{
    mostrarPrestamo();
  },[])

  const guardarPrestamo= async (prestamo)=>{
    const response=await fetch('https://localhost:7062/Prestamos',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(prestamo)
    })
    if(response.ok){
      toast.success("Se ha creado un nuevo prestamo!");
      setMostrarModal(!mostrarModal);
      mostrarPrestamo()
      

    }
  }

  const editarPrestamo= async (prestamo) => {
    const response = await fetch(`https://localhost:7062/Prestamos/${prestamo.idPrestamos}`,{
      method:'PUT',
      headers:{
        'Content-Type': 'application/json; charset=utf-8'},
        body:JSON.stringify(prestamo)
        
    })

    if(response.ok){
      toast.success("Se ha editado el prestamo !");

      setMostrarModal(!mostrarModal);
      mostrarPrestamo()
    }
  }

  const eliminarPrestamo = async(id)=>{
    var respuesta=window.confirm("Desea eliminar la prestamo?")
    if(!respuesta){
      return;
    }
    const response = await fetch(`https://localhost:7062/Prestamos/${id}`,{
      method:'DELETE',
    })
    if (response.ok){
      toast.success("Eliminado correctamente")
       mostrarPrestamo()
      

    }
  }

  return (
    <Container className='contenedor' >
      <Row className='mt-5'>
        <Col sm="12">
          <Card>
            <CardHeader>
              <h5>Prestamo</h5>
            </CardHeader>
            <CardBody>
              <Button size="sm" color='success'
              onClick={()=>setMostrarModal(!mostrarModal)}>Nueva Prestamo</Button>
              <hr/>
              <TablaPrestamos 
              data={prestamos}
              setEditar={setEditar}
              mostrarModal={mostrarModal}
              setMostrarModal={setMostrarModal}
              eliminarPrestamo={eliminarPrestamo}
              />

            </CardBody>
          </Card>
        </Col>


      </Row>
      <ModalPrestamo
      mostrarModal={mostrarModal}
      setMostrarModal={setMostrarModal}
      guardarPrestamo={guardarPrestamo}

      editar={editar}
      setEditar={setEditar}
      editarPrestamo={editarPrestamo}/>


<ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />

      
     
    </Container>
    
  )
}

export default PrestamoPage