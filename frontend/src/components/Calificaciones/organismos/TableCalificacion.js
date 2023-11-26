import { Button, Table } from 'reactstrap'

const TablaCalificacion = ({data,setEditar,mostrarModal,setMostrarModal, eliminarCalificacion}) => {
    const enviarDatos=(calificacion)=>{
        setEditar(calificacion)
        setMostrarModal(!mostrarModal)
    }

  return (
    <Table striped responsive>
        <thead>
            <tr>
                <th>Id calificación</th>
                <th>Id Libro</th>
                <th>Id Usuario</th>
                <th>Calificación</th>
                <th>Reseña</th>
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
                        <tr key={items.idCalificaciones}>
                            <td>{items.idLibro}</td>
                            <td>{items.idUsuario}</td>
                            <td>{items.calificacion}</td>
                            <td>{items.resenia}</td>
                            <td>
                                <Button color='primary' size='sm' className='me-2'
                                onClick={()=>enviarDatos(items)}>Editar</Button>
                                
                            </td>
                            <td>
                                
                                <Button color='danger' size='sm' onClick={()=>eliminarCalificacion(items.idCalificaciones)} >Eliminar</Button>
                            </td>

                        </tr>

                    ))
                )
            }

        </tbody>

    </Table>
    
  )
}

export {TablaCalificacion}