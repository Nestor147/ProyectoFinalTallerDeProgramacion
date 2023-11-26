import { Button, Table } from 'reactstrap'

const TablaReserva = ({data,setEditar,mostrarModal,setMostrarModal, eliminarReserva}) => {
    const enviarDatos=(reserva)=>{
        setEditar(reserva)
        setMostrarModal(!mostrarModal)
    }

  return (
    <Table striped responsive>
        <thead>
            <tr>
                <th>Id Reserva</th>
                <th>Id Libro</th>
                <th>Id Usuario</th>
                <th>Fecha Reserva</th>
                <th>Estado</th>
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
                        <tr key={items.idReservas}>
                            <td>{items.idLibro}</td>
                            <td>{items.idUsuario}</td>
                            <td>{items.fechaReserva}</td>
                            <td>{items.estado}</td>
                            <td>
                                <Button color='primary' size='sm' className='me-2'
                                onClick={()=>enviarDatos(items)}>Editar</Button>
                                
                            </td>
                            <td>
                                
                                <Button color='danger' size='sm' onClick={()=>eliminarReserva(items.id)} >Eliminar</Button>
                            </td>

                        </tr>

                    ))
                )
            }

        </tbody>

    </Table>
    
  )
}

export {TablaReserva}