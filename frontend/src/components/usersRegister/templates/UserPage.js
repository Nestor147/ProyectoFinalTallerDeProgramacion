import { Container ,Row,Col, Card, CardHeader, CardBody, Button} from 'reactstrap'
import { TablaPersonas } from '../organismos/TableUsers'
import React, { useState,useEffect } from 'react'
import { ModalPersona } from '../organismos/ModalUser'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import { toast, ToastContainer } from "react-toastify/dist/toastify.esm.js";
// import { toast, ToastContainer } from 'react-toastify/dist/inject-style.esm.mjs'

const UserPage = () => {
  const [personas,setPersonas]=useState([])
  const [mostrarModal,setMostrarModal] = useState(false)
  const [editar,setEditar]=useState(null)

  const mostrarPersonas= async()=>{
    console.log("conexion")

    const response = await fetch('https://localhost/Usuario/')

    if (response.ok){
      console.log("la data es")
    const data=await response.json();
    console.log("Esta"+data)

    setPersonas(data)
    }else{
      console.log('Error en la lista')
      }
    }
  useEffect(()=>{
    console.log("es esta pidiendo la data")
    mostrarPersonas();
  },[])

  const guardarPersona= async (persona)=>{
    const response=await fetch('https://localhost:7062/Usuario',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(persona)
    })
    if(response.ok){
      toast.success("Se ha creado un nuevo usuario!");
      setMostrarModal(!mostrarModal);
      mostrarPersonas()
      

    }
  }

  const editarpersona= async (persona) => {
    const response = await fetch(`https://localhost:7062/Usuario/${persona.id}`,{
      method:'PUT',
      headers:{
        'Content-Type': 'application/json; charset=utf-8'},
        body:JSON.stringify(persona)
        
    })

    if(response.ok){
      toast.success("Se ha editado el usuario !");

      setMostrarModal(!mostrarModal);
      mostrarPersonas()
    }
  }

  const eliminarPersona = async(id)=>{
    var respuesta=window.confirm("Desea eliminar la persona?")
    if(!respuesta){
      return;
    }
    const response = await fetch(`https://localhost:7062/Usuario/${id}`,{
      method:'DELETE',
    })
    if (response.ok){
      toast.success("Eliminado correctamente")
       mostrarPersonas()
      

    }
  }

  return (
    <Container className='contenedor' >
      <Row className='mt-5'>
        <Col sm="12">
          <Card>
            <CardHeader>
              <h5>Usuarios</h5>
            </CardHeader>
            <CardBody>
              <Button size="sm" color='success'
              onClick={()=>setMostrarModal(!mostrarModal)}>Nueva Persona</Button>
              <hr/>
              <TablaPersonas 
              data={personas}
              setEditar={setEditar}
              mostrarModal={mostrarModal}
              setMostrarModal={setMostrarModal}
              eliminarPersona={eliminarPersona}
              />

            </CardBody>
          </Card>
        </Col>


      </Row>
      <ModalPersona
      mostrarModal={mostrarModal}
      setMostrarModal={setMostrarModal}
      guardarPersona={guardarPersona}

      editar={editar}
      setEditar={setEditar}
      editarpersona={editarpersona}/>


<ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />

      
     
    </Container>
    
  )
}

export default UserPage