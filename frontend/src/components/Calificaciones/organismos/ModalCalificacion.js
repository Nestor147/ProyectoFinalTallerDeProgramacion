import React, { useEffect, useState } from 'react'
import {Modal, ModalBody, ModalHeader,Form, FormGroup,Label,Input,Button,ModalFooter} from 'reactstrap';
import styled from "styled-components";
import { toast } from "react-toastify";
const modeloCalificacion={
  idCalificaciones:0,
  idLibro:0,
  idUsuario:0,
  calificacion:0,
  resenia:"",
}
const ModalCalificacion = ({mostrarModal,setMostrarModal,guardarCalificacion,editar,setEditar,editarCalificacion}) => {

  const [calificacion,setCalificacion]=useState(modeloCalificacion)


  const ObtenerdatosInput = (e) => {
    const { name, value } = e.target;
  
    
      setCalificacion((prevCalificacion) => ({
        ...prevCalificacion,
        [name]: value,
      }));
    }
  



  const enviarDatos=async ()=>{
    if (calificacion.idCalificaciones === "" || calificacion.idLibro === "" || calificacion.idUsuario === "" || calificacion.calificacion === "" || calificacion.resenia === "") {
      toast.warn("Complete todos los campos!");
      return;
    }
    if(calificacion.idCalificaciones===0){
      await guardarCalificacion(calificacion)
    }else{
      editarCalificacion(calificacion)
    }
    setCalificacion(modeloCalificacion)
  }

  useEffect(()=>{
    if(editar!==null){
      setCalificacion(editar)
    }else{
      setCalificacion(modeloCalificacion)
    }
  },[editar])

  const cerrarModal=()=>{
    setMostrarModal(!mostrarModal)
    setEditar(null)
  }



  return (
    <Modal isOpen={mostrarModal}>
        <ModalHeader>
          {calificacion.id===0 ? 'NUEVA Calificación' : 'EDITAR Calificación'}
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label  >Id Calificación</Label>
              <Input name="idCalificaciones" onChange={(e)=>ObtenerdatosInput(e)} value={calificacion.idCalificaciones}/>
            </FormGroup>
            <FormGroup>
              <Label>Id Libro</Label>
              <Input name="idLibro" onChange={(e)=>ObtenerdatosInput(e)} value={calificacion.idLibro}/>
            </FormGroup>
            <FormGroup>
              <Label>Id Usuario</Label>
              <Input type='idUsuario'  onChange={(e)=>ObtenerdatosInput(e)} value={calificacion.idUsuario}/>
            </FormGroup>
        
            <FormGroup>
              <Label>Calificacion</Label>
              <Input name="calificacion" onChange={(e)=>ObtenerdatosInput(e)} value={calificacion.calificacion}/>
            </FormGroup>

            <FormGroup>
              <Label>Reseña</Label>
              <Input name="resenia" onChange={(e)=>ObtenerdatosInput(e)} value={calificacion.resenia}/>
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

export {ModalCalificacion}





