import { Button, Table } from 'reactstrap'

const TablaPrestamos = ({data,setEditar,mostrarModal,setMostrarModal,eliminarPrestamo}) => {
    const enviarDatos=(libro)=>{
        setEditar(libro)
        setMostrarModal(!mostrarModal)
    }

  return (
    <Table striped responsive>
        <thead>
            <tr>
                <th>Id Libro</th>
                <th>Id Usuario</th>
                <th>Fecha Prestamo</th>
                <th>Fecha Devolución</th>
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
                        <tr key={items.idPrestamos}>
                            <td>{items.idLibro}</td>
                            <td>{items.idUsuario}</td>
                            <td>{items.fechaPrestamo}</td>
                            <td>{items.fechaDevolucion}</td>
                            <td>
                                <Button color='primary' size='sm' className='me-2'
                                onClick={()=>enviarDatos(items)}>Editar</Button>
                                
                            </td>
                            <td>
                                
                                <Button color='danger' size='sm' onClick={()=>eliminarPrestamo(items.id)} >Eliminar</Button>
                            </td>

                        </tr>

                    ))
                )
            }

        </tbody>

    </Table>
    
  )
}

export {TablaPrestamos}