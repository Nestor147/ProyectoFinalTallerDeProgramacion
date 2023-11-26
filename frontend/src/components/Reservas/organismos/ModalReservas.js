import React, { useEffect, useState } from 'react'
import {Modal, ModalBody, ModalHeader,Form, FormGroup,Label,Input,Button,ModalFooter} from 'reactstrap';
import styled from "styled-components";
import { toast } from "react-toastify";
const modeloReserva={
  idReservas:0,
  idLibro:0,
  idUsuario:0,
  fechaReserva:"",
  estado:false,
}
const ModalReserva = ({mostrarModal,setMostrarModal, guardarReserva,editar,setEditar, editarReserva}) => {

  const [reserva,setReserva]=useState(modeloReserva)


  const ObtenerdatosInput = (e) => {
    const { name, value } = e.target;
  
  
      setReserva((prevReserva) => ({
        ...prevReserva,
        [name]: value,
      }));
    
  };



  const enviarDatos=async ()=>{
    if (reserva.idLibro === "" || reserva.idUsuario === "" || reserva.fechaReserva === "" || reserva.estado === "" ) {
      toast.warn("Complete todos los campos!");
      return;
    }
    if(reserva.idReservas===0){
      await guardarReserva(reserva)
    }else{
      editarReserva(reserva)
    }
    setReserva(modeloReserva)
  }

  useEffect(()=>{
    if(editar!==null){
      setReserva(editar)
    }else{
      setReserva(modeloReserva)
    }
  },[editar])

  const cerrarModal=()=>{
    setMostrarModal(!mostrarModal)
    setEditar(null)
  }



  return (
    <Modal isOpen={mostrarModal}>
        <ModalHeader>
          {reserva.id===0 ? 'NUEVA Reserva' : 'EDITAR Reserva'}
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label  >Id Libro</Label>
              <Input name="idLibro" onChange={(e)=>ObtenerdatosInput(e)} value={reserva.idLibro}/>
            </FormGroup>
            <FormGroup>
              <Label>Id Usuario</Label>
              <Input name="idUsuario" onChange={(e)=>ObtenerdatosInput(e)} value={reserva.idUsuario}/>
            </FormGroup>
            <FormGroup>
              <Label>Fecha Reserva</Label>
              <Input type='datatime' name="fechaReserva" onChange={(e)=>ObtenerdatosInput(e)} value={reserva.fechaReserva}/>
            </FormGroup>
        
            <FormGroup>
              <Label>Estado</Label>
              <Input name="estado" onChange={(e)=>ObtenerdatosInput(e)} value={reserva.estado}/>
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

export {ModalReserva}





