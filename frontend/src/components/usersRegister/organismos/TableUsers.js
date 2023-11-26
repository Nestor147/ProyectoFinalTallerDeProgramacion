import { Button, Table } from 'reactstrap'

const TablaPersonas = ({data,setEditar,mostrarModal,setMostrarModal,eliminarPersona}) => {
    const enviarDatos=(persona)=>{
        setEditar(persona)
        setMostrarModal(!mostrarModal)
    }

  return (
    <Table striped responsive>
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>C.I</th>
                <th>Email</th>
                <th>Role</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {
                (data.length < 1) ? (
                <tr>
                    <td colSpan='6'>Sin registros</td>

                </tr>
                ):(
                    data.map(items=>(
                        <tr key={items.idUsuario}>
                            <td>{items.nombre}</td>
                            <td>{items.apellido}</td>
                            <td>{items.ci}</td>
                            <td>{items.email}</td>
                            <td>{items.rol}</td>
                            <td>
                                <Button color='primary' size='sm' className='me-2'
                                onClick={()=>enviarDatos(items)}>Editar</Button>
                                
                            </td>
                            <td>
                                
                                <Button color='danger' size='sm' onClick={()=>eliminarPersona(items.id)} >Eliminar</Button>
                            </td>

                        </tr>

                    ))
                )
            }

        </tbody>

    </Table>
    
  )
}

export {TablaPersonas}