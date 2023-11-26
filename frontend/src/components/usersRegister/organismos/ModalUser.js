import React, { useEffect, useState } from 'react'
import {Modal, ModalBody, ModalHeader,Form, FormGroup,Label,Input,Button,ModalFooter} from 'reactstrap';
import { toast } from "react-toastify";
const modeloPersona={
  idUsuario:0,
  nombre:"",
  apellido:"",
  ci:"",
  email:"",
  contracenia:"",
  rol:"",
}
const ModalPersona = ({mostrarModal,setMostrarModal,guardarPersona,editar,setEditar,editarpersona}) => {

  const [persona,setPersona]=useState(modeloPersona)


  const ObtenerdatosInput = (e) => {
    const { name, value } = e.target;
  
    if (name === "rol") {
      setPersona((prevPersona) => ({
        ...prevPersona,
        role: value,
      }));
    } else {
      setPersona((prevPersona) => ({
        ...prevPersona,
        [name]: value,
      }));
    }
  };



  const enviarDatos=async ()=>{
    if (persona.nombre === "" || persona.apellido === "" || persona.email === "" || persona.role === "" || persona.password === "") {
      toast.warn("Complete todos los campos!");
      return;
    }
    if(persona.id===0){
      await guardarPersona(persona)
    }else{
      editarpersona(persona)
    }
    setPersona(modeloPersona)
  }

  useEffect(()=>{
    if(editar!==null){
      setPersona(editar)
    }else{
      setPersona(modeloPersona)
    }
  },[editar])

  const cerrarModal=()=>{
    setMostrarModal(!mostrarModal)
    setEditar(null)
  }



  return (
    <Modal isOpen={mostrarModal}>
        <ModalHeader>
          {persona.idUsuario===0 ? 'NUEVA USUARIO' : 'EDITAR USUARIO'}
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label  >Nombre</Label>
              <Input name="nombre" onChange={(e)=>ObtenerdatosInput(e)} value={persona.nombre}/>
            </FormGroup>
            <FormGroup>
              <Label>Apellido</Label>
              <Input name="apellido" onChange={(e)=>ObtenerdatosInput(e)} value={persona.apellido}/>
            </FormGroup>
            <FormGroup>
              <Label>C.I</Label>
              <Input name="ci" onChange={(e)=>ObtenerdatosInput(e)} value={persona.ci}/>
            </FormGroup>
            <FormGroup>
              <Label>Correo</Label>
              <Input type='email' name="email" onChange={(e)=>ObtenerdatosInput(e)} value={persona.email}/>
            </FormGroup>
        
           

            <FormGroup>
              <Label>Contraseña</Label>
              <Input name="contracenia" onChange={(e)=>ObtenerdatosInput(e)} value={persona.contracenia}/>
            </FormGroup>


            <FormGroup>
            <Label  >Rol</Label>
          <Input
      id="rol"
      name="rol"
      type="select"
      onChange={(e)=>ObtenerdatosInput(e)} 
    >
       <option value="usuario">
        Usuario
      </option>
      <option value="administrador">
        Administrador
      </option>
      <option value="bibliotecarios">
        Bibliotecario
      </option>
      <option value="miembros">
        Miembro
      </option>
   
    </Input>
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

export {ModalPersona}





