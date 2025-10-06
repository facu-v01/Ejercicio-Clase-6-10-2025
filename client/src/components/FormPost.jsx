import React, { useState } from "react"
import {validacionCampos, alertas, enviarFormulario} from "./funcionesContacto"

function FormPost() {

    // --ESTADOS -- //
    //Estado de los datos del form
    const [datos, setDatos] = useState({
        id: 1,
        title: "",
        content: "",
        author: "",
        createdAt: "",
        comments: []
    })

    //Estado que almacenará los errores de validación de los campos
    const [errores, setErrores] = useState({
        title: "",
        content: "",
        author: ""
    })

    //Estado que controla si el usuario trató de enviar el formulario o no (usado para validación dinámica de campos)
    const [intento, setIntento] = useState(false)

    //Estado que establece si el form fue enviado correctamente
    const [envioExitoso, setExitoso] = useState(false)


    // -- FUNCIÓN ACTUALIZACIÓN DE DATOS -- //
    //Se define la función encargada de actualizar en tiempo real los campos con lo que el usuario escribe y los authors de error
    const actualizarDatos = (d) => {
        const {name, value} = d.target

        const datosNuevos = { ...datos, [name]: value }
        setDatos(datosNuevos)

        if (intento) {
            const validaciones = validacionCampos(datosNuevos)
            const authors = alertas(validaciones)
            setErrores(authors)
        }     
    }

    // -- DEVOLUCIÓN DE FORMULARIO -- //
    return (
        <form id="contacto-form" onSubmit={(evento) => enviarFormulario({evento, datos, setDatos, setErrores, setIntento, setExitoso})} noValidate>
            <div>
                <label htmlFor="title" className="contacto-label">Título del post</label><br></br>
                <input 
                    id="title"
                    type="text"                 
                    name="title" 
                    className="contacto-input" 
                    value={datos.title}
                    onChange={actualizarDatos}
                    required
                />
                {errores.title && <p className="error-validacion">{errores.title}</p>}
            </div>

            <div>
                <label htmlFor="author" className="contacto-label">Autor</label><br></br>
                <input 
                    id="author" 
                    type="text"                 
                    name="author" 
                    className="contacto-input" 
                    value={datos.author}
                    onChange={actualizarDatos}
                    required 
                />
                {errores.author && <p className="error-validacion">{errores.author}</p>}
            </div>

            <div>
                <label htmlFor="content" className="contacto-label">Contenido del post</label><br></br>
                <textarea 
                    id="content" 
                    name="content" 
                    rows="6" 
                    value={datos.content}
                    onChange={actualizarDatos}
                    required
                />
                {errores.content && <p className="error-validacion">{errores.content}</p>}
            </div>

            <div>
                <button id="contacto-button" type="submit">Postear</button>
            </div>
        </form>
    )
}

export default FormPost