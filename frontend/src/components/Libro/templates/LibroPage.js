import { Container ,Row,Col, Card, CardHeader, CardBody, Button} from 'reactstrap'
import { TablaLibro } from '../organismos/TableLibro'
import React, { useState,useEffect } from 'react'
import { ModalLibro } from '../organismos/ModalLibro'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import { toast, ToastContainer } from "react-toastify/dist/toastify.esm.js";
// import { toast, ToastContainer } from 'react-toastify/dist/inject-style.esm.mjs'

const LibroPage = () => {
  const [libros,serLibros]=useState([])
  const [mostrarModal,setMostrarModal] = useState(false)
  const [editar,setEditar]=useState(null)

  const mostrarLibros= async()=>{
    const response = await fetch('https://localhost:7062/Libro/')
    if (response.ok){
    const data=await response.json();
    serLibros(data)
    }else{
      console.log('Error en la lista')
      }
    }
  useEffect(()=>{
    mostrarLibros();
  },[])

  const guardarLibro= async (libro)=>{
    const response=await fetch('https://localhost:7062/Libro',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(libro)
    })
    if(response.ok){
      toast.success("Se ha creado un nuevo libro!");
      setMostrarModal(!mostrarModal);
      mostrarLibros()
      

    }
  }

  const editarLibro= async (libro) => {
    const response = await fetch(`https://localhost:7062/Libro/${libro.idLibro}`,{
      method:'PUT',
      headers:{
        'Content-Type': 'application/json; charset=utf-8'},
        body:JSON.stringify(libro)
        
    })

    if(response.ok){
      toast.success("Se ha editado el libro !");

      setMostrarModal(!mostrarModal);
      mostrarLibros()
    }
  }

  const eliminarLibro = async(id)=>{
    var respuesta=window.confirm("Desea eliminar la libro?")
    if(!respuesta){
      return;
    }
    const response = await fetch(`https://localhost:7062/Libro/${id}`,{
      method:'DELETE',
    })
    if (response.ok){
      toast.success("Eliminado correctamente")
      mostrarLibros()
      

    }
  }

  return (
    <Container className='contenedor' >
      <Row className='mt-5'>
        <Col sm="12">
          <Card>
            <CardHeader>
              <h5>Libros</h5>
            </CardHeader>
            <CardBody>
              <Button size="sm" color='success'
              onClick={()=>setMostrarModal(!mostrarModal)}>Nueva Libro</Button>
              <hr/>
              <TablaLibro 
              data={libros}
              setEditar={setEditar}
              mostrarModal={mostrarModal}
              setMostrarModal={setMostrarModal}
              eliminarLibro={eliminarLibro}
              />

            </CardBody>
          </Card>
        </Col>


      </Row>
      <ModalLibro
      mostrarModal={mostrarModal}
      setMostrarModal={setMostrarModal}
      guardarLibro={guardarLibro}

      editar={editar}
      setEditar={setEditar}
      editarLibro={editarLibro}/>


<ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />

      
     
    </Container>
    
  )
}

export default LibroPage