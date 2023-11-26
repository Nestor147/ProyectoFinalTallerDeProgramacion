import { Button, Table } from 'reactstrap'

const TablaLibro = ({data,setEditar,mostrarModal,setMostrarModal,eliminarLibro}) => {
    const enviarDatos=(libro)=>{
        setEditar(libro)
        setMostrarModal(!mostrarModal)
    }

  return (
    <Table striped responsive>
        <thead>
            <tr>
                <th>titulo</th>
                <th>autor</th>
                <th>genero</th>
                <th>fechaPublicacion</th>
                <th>disponibilidad</th>
                <th>resumen</th>
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
                        <tr key={items.idLibro}>
                            <td>{items.titulo}</td>
                            <td>{items.autor}</td>
                            <td>{items.genero}</td>
                            <td>{items.fechaPublicacion}</td>
                            <td>{items.disponibilidad}</td>
                            <td>{items.resumen}</td>
                            <td>
                                <Button color='primary' size='sm' className='me-2'
                                onClick={()=>enviarDatos(items)}>Editar</Button>
                                
                            </td>
                            <td>
                                
                                <Button color='danger' size='sm' onClick={()=>eliminarLibro(items.id)} >Eliminar</Button>
                            </td>

                        </tr>

                    ))
                )
            }

        </tbody>

    </Table>
    
  )
}

export {TablaLibro}