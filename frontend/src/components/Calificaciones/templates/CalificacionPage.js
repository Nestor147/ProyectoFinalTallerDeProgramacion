import { Container ,Row,Col, Card, CardHeader, CardBody, Button} from 'reactstrap'
import { TablaCalificacion } from '../organismos/TableCalificacion'
import React, { useState,useEffect } from 'react'
import { ModalCalificacion } from '../organismos/ModalCalificacion'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import { toast, ToastContainer } from "react-toastify/dist/toastify.esm.js";
// import { toast, ToastContainer } from 'react-toastify/dist/inject-style.esm.mjs'

const CalificionPage = () => {
  const [calificaciones,setCalificaciones]=useState([])
  const [mostrarModal,setMostrarModal] = useState(false)
  const [editar,setEditar]=useState(null)

  const mostrarCalificaciones= async()=>{
    const response = await fetch('https://localhost:7062/Calificaciones/')
    if (response.ok){
    const data=await response.json();
    setCalificaciones(data)
    }else{
      console.log('Error en la lista')
      }
    }
  useEffect(()=>{
    mostrarCalificaciones();
  },[])

  const guardarCalificacion= async (calificacion)=>{
    const response=await fetch('https://localhost:7062/Calificaciones',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(calificacion)
    })
    if(response.ok){
      toast.success("Se ha creado la calificación!");
      setMostrarModal(!mostrarModal);
      mostrarCalificaciones()
      

    }
  }

  const editarCalificacion= async (calificacion) => {
    const response = await fetch(`https://localhost:7062/Calificaciones/${calificacion.idCalificaciones}`,{
      method:'PUT',
      headers:{
        'Content-Type': 'application/json; charset=utf-8'},
        body:JSON.stringify(calificacion)
        
    })

    if(response.ok){
      toast.success("Se ha editado la calificacion !");

      setMostrarModal(!mostrarModal);
      mostrarCalificaciones()
    }
  }

  const eliminarCalificacion = async(id)=>{
    var respuesta=window.confirm("Desea eliminar la calificacion?")
    if(!respuesta){
      return;
    }
    const response = await fetch(`https://localhost:7062/Calificaciones/${id}`,{
      method:'DELETE',
    })
    if (response.ok){
      toast.success("Eliminado correctamente")
       mostrarCalificaciones()
      

    }
  }

  return (
    <Container className='contenedor' >
      <Row className='mt-5'>
        <Col sm="12">
          <Card>
            <CardHeader>
              <h5>Calificaciones</h5>
            </CardHeader>
            <CardBody>
              <Button size="sm" color='success'
              onClick={()=>setMostrarModal(!mostrarModal)}>Nueva Calificación</Button>
              <hr/>
              <TablaCalificacion 
              data={calificaciones}
              setEditar={setEditar}
              mostrarModal={mostrarModal}
              setMostrarModal={setMostrarModal}
              eliminarCalificacion={eliminarCalificacion}
              />

            </CardBody>
          </Card>
        </Col>


      </Row>
      <ModalCalificacion
      mostrarModal={mostrarModal}
      setMostrarModal={setMostrarModal}
      guardarCalificacion={guardarCalificacion}

      editar={editar}
      setEditar={setEditar}
      editarCalificacion={editarCalificacion}/>


<ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />

      
     
    </Container>
    
  )
}

export default CalificionPage