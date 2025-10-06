// ---VALIDACIÓN Y ENVÍO DEL FORM (CONTACTO)---

// Función validadora de campos
export function validacionCampos({id, title, content, author, createdAt, comments}) {
    const validaciones = {
        valTitle: title.trim().length > 0,
        valContent: content.length > 0,
        valAuthor: author.trim().length > 0
    }

    // Se devuelve el array para ser usado posteriormente
    return validaciones
}

// Función generadora de alerts
export function alertas({valTitle, valContent, valAuthor}) {
    
    //Se crea un objeto errores que devuelve el author a mostrar en el DOM según la validez de los campos
    const errores = {
        title: valTitle ? "" : "Por favor ingrese un título válido",
        content: valContent ? "" : "Por favor ingrese un contenido válido",
        author: valAuthor ? "" : "Por favor ingrese un autor"
    }

    return errores
}

//Se define la función encargada de enviar el formulario a la API del backend
export async function enviarFormulario({evento, datos, setDatos, setErrores, setIntento, setExitoso}) {
    //Se previene que la página se refresque al darse el submit (por click o enter) y que se pueda verificar
    evento.preventDefault()

    //Se establece que el usuario intentó enviar el formulario
    setIntento(true)

    //Se validan los campos y generan y setean los errores correspondientes
    const validaciones = validacionCampos(datos)
    const authors = alertas(validaciones)
    setErrores(authors)

    //Se verifica que todos los valores ingresados en los campos sean válidos antes de enviar el formulario
    const datosValidos = Object.values(validaciones).every(v => v)
    if (!datosValidos) {return}
    
    try {
        const respuesta = await fetch(`http://localhost:4000/api/posts`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(datos)
        })

        if(!respuesta.ok) {
            throw new Error(`Error HTTP: el estado es ${respuesta.status}`)
        }

        const data = await respuesta.json()
        console.log("Datos enviados:", datos)
        console.log("Respuesta API:", data)
        setExitoso(true)
        setTimeout(() => {
            setExitoso(false)
            setDatos({title: "", content: "", author: ""})
            setErrores({title: "", content: "", author: ""})
            setIntento(false)
        }, 3000)


    } catch (error) {
        console.error("Error:", error)
        alert("Se produjo un error al enviar el formulario.")
    }
    
}