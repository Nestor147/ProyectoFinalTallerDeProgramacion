import { Container ,Row,Col, Card, CardHeader, CardBody, Button} from 'reactstrap'
import { TablaReserva } from '../organismos/TableReservas'
import React, { useState,useEffect } from 'react'
import { ModalReserva } from '../organismos/ModalReservas'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import { toast, ToastContainer } from "react-toastify/dist/toastify.esm.js";
// import { toast, ToastContainer } from 'react-toastify/dist/inject-style.esm.mjs'

const ReservasPage = () => {
  const [reservas,setReservas]=useState([])
  const [mostrarModal,setMostrarModal] = useState(false)
  const [editar,setEditar]=useState(null)

  const mostrarReserva= async()=>{
    const response = await fetch(`https://localhost:7062/Reservas/`)
    if (response.ok){
    const data=await response.json();
    setReservas(data)
    }else{
      console.log('Error en la lista')
      }
    }
  useEffect(()=>{
    mostrarReserva();
  },[])

  const guardarReserva= async (reserva)=>{
    const response=await fetch('https://localhost:7062/Reservas',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(reserva)
    })
    if(response.ok){
      toast.success("Se ha creado un nuevo reserva!");
      setMostrarModal(!mostrarModal);
      mostrarReserva()
      

    }
  }

  const editarReserva= async (reserva) => {
    const response = await fetch(`https://localhost:7062/Reservas/${reserva.idReservas}`,{
      method:'PUT',
      headers:{
        'Content-Type': 'application/json; charset=utf-8'},
        body:JSON.stringify(reserva)
        
    })

    if(response.ok){
      toast.success("Se ha editado el reserva !");

      setMostrarModal(!mostrarModal);
      mostrarReserva()
    }
  }

  const eliminarReserva = async(id)=>{
    var respuesta=window.confirm("Desea eliminar la reserva?")
    if(!respuesta){
      return;
    }
    const response = await fetch(`https://localhost:7062/Reservas/${id}`,{
      method:'DELETE',
    })
    if (response.ok){
      toast.success("Eliminado correctamente")
       mostrarReserva()
      

    }
  }

  return (
    <Container className='contenedor' >
      <Row className='mt-5'>
        <Col sm="12">
          <Card>
            <CardHeader>
              <h5>Reservas</h5>
            </CardHeader>
            <CardBody>
              <Button size="sm" color='success'
              onClick={()=>setMostrarModal(!mostrarModal)}>Nueva Persona</Button>
              <hr/>
              <TablaReserva
              data={reservas}
              setEditar={setEditar}
              mostrarModal={mostrarModal}
              setMostrarModal={setMostrarModal}
              eliminarReserva={eliminarReserva}
              />

            </CardBody>
          </Card>
        </Col>


      </Row>
      <ModalReserva
      mostrarModal={mostrarModal}
      setMostrarModal={setMostrarModal}
      guardarReserva={guardarReserva}

      editar={editar}
      setEditar={setEditar}
      editarReserva={editarReserva}/>


<ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />

      
     
    </Container>
    
  )
}

export default ReservasPage