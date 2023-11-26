import React, { useEffect, useState } from 'react'
import {Modal, ModalBody, ModalHeader,Form, FormGroup,Label,Input,Button,ModalFooter} from 'reactstrap';
import styled from "styled-components";
import { toast } from "react-toastify";
const modeloPrestamos={
  idPrestamos:0,
  idLibro:"",
  idUsuario:"",
  fechaPrestamo:"",
  fechaDevolucion:"",
}
const ModalPrestamo = ({mostrarModal,setMostrarModal,guardarPrestamo,editar,setEditar,editarPrestamo}) => {

  const [prestamo,setPrestamo]=useState(modeloPrestamos)


  const ObtenerdatosInput = (e) => {
    const { name, value } = e.target;
  
    
      setPrestamo((prevPrestamo) => ({
        ...prevPrestamo,
        [name]: value,
      }));
    
  };



  const enviarDatos=async ()=>{
    if (prestamo.idLibro === "" || prestamo.idUsuario === "" || prestamo.fechaPrestamo === "" || prestamo.fechaDevolucion === "" ) {
      toast.warn("Complete todos los campos!");
      return;
    }
    if(prestamo.idPrestamos===0){
      await guardarPrestamo(prestamo)
    }else{
      editarPrestamo(prestamo)
    }
    setPrestamo(modeloPrestamos)
  }

  useEffect(()=>{
    if(editar!==null){
      setPrestamo(editar)
    }else{
      setPrestamo(modeloPrestamos)
    }
  },[editar])

  const cerrarModal=()=>{
    setMostrarModal(!mostrarModal)
    setEditar(null)
  }



  return (
    <Modal isOpen={mostrarModal}>
        <ModalHeader>
          {prestamo.idPrestamos===0 ? 'NUEVA Prestamo' : 'EDITAR Prestamo'}
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label  >Id Libro</Label>
              <Input name="idLibro" onChange={(e)=>ObtenerdatosInput(e)} value={prestamo.idLibro}/>
            </FormGroup>
            <FormGroup>
              <Label>Id Usuario</Label>
              <Input name="idUsuario" onChange={(e)=>ObtenerdatosInput(e)} value={prestamo.idUsuario}/>
            </FormGroup>
            <FormGroup>
              <Label>Fecha Prestamo</Label>
              <Input type='datetime' name="fechaPrestamo" onChange={(e)=>ObtenerdatosInput(e)} value={prestamo.fechaPrestamo}/>
            </FormGroup>
  

            <FormGroup>
              <Label>Fecha Devolución</Label>
              <Input name="fechaDevolucion" type='datetime' onChange={(e)=>ObtenerdatosInput(e)} value={prestamo.fechaDevolucion}/>
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

export {ModalPrestamo }





