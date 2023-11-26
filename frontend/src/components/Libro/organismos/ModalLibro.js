import React, { useEffect, useState } from 'react'
import {Modal, ModalBody, ModalHeader,Form, FormGroup,Label,Input,Button,ModalFooter} from 'reactstrap';
import styled from "styled-components";
import { toast } from "react-toastify";
const modeloLibro={
  idLibro:0,
  titulo:"",
  autor:"",
  genero:"",
  fechaPublicacion:"",
  disponibilidad:true,
  resumen:""

}
const ModalLibro = ({mostrarModal,setMostrarModal,guardarLibro,editar,setEditar, editarLibro}) => {

  const [libro,setLibro]=useState(modeloLibro)


  const ObtenerdatosInput = (e) => {
    const { name, value } = e.target;
  
      setLibro((prevLibro) => ({
        ...prevLibro,
        [name]: value,
      }));
    
  };



  const enviarDatos=async ()=>{
    if (libro.titulo === "" || libro.autor === "" || libro.genero === "" || libro.fechaPublicacion === "" || libro.disponibilidad === "" || libro.resumen === "") {
      toast.warn("Complete todos los campos!");
      return;
    }
    if(libro.idLibro===0){
      await guardarLibro(libro)
    }else{
      editarLibro(libro)
    }
    setLibro(modeloLibro)
  }

  useEffect(()=>{
    if(editar!==null){
      setLibro(editar)
    }else{
      setLibro(modeloLibro)
    }
  },[editar])

  const cerrarModal=()=>{
    setMostrarModal(!mostrarModal)
    setEditar(null)
  }



  return (
    <Modal isOpen={mostrarModal}>
        <ModalHeader>
          {libro.id===0 ? 'NUEVA Libro' : 'EDITAR Libro'}
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label  >Titulo</Label>
              <Input name="titulo" onChange={(e)=>ObtenerdatosInput(e)} value={libro.titulo}/>
            </FormGroup>
            <FormGroup>
              <Label>Autor</Label>
              <Input name="autor" onChange={(e)=>ObtenerdatosInput(e)} value={libro.autor}/>
            </FormGroup>
            <FormGroup>
              <Label>Genero</Label>
              <Input type='genero' onChange={(e)=>ObtenerdatosInput(e)} value={libro.genero}/>
            </FormGroup>
        
            <FormGroup>
              <Label>Fecha publicacion</Label>
              <Input name="fechaPublicacion" onChange={(e)=>ObtenerdatosInput(e)} value={libro.fechaPublicacion}/>
            </FormGroup>

            <FormGroup>
              <Label>Disponibilidad</Label>
              <Input name="disponibilidad" onChange={(e)=>ObtenerdatosInput(e)} value={libro.disponibilidad}/>
            </FormGroup>

            <FormGroup>
              <Label>Resumen</Label>
              <Input name="resumen" onChange={(e)=>ObtenerdatosInput(e)} value={libro.resumen}/>
            </FormGroup>

          </Form>
        </ModalBody>
        <ModalFooter>
        <Button color='primary' size='sm' onClick={enviarDatos}>Guardar</Button>
        <Button color='danger' size='sm' onClick={cerrarModal}>Cerrar</Button>
        </ModalFooter>
    </Modal>
  )
}

export {ModalLibro }





