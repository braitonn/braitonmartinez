// URL para acceder a la API
const url = './api/datos.php?tabla=propiedades';

/**
 * Función asíncrona para seleccionar Propiedades 
 */ 
export async function seleccionarPropiedades() {
    let res = await fetch(`${url}&accion=seleccionar`);
    let datos = await res.json();
    if(res.status !== 200) {
        throw Error('Los datos no existen');
    }
    // console.log(datos);
    return datos;
}

/**
 * Inserta los datos en la base de datos
 * @param datos los datos a insertar
 */
export const insertarPropiedades = (datos) => {
    fetch(url + '&accion=insertar', {
        method: 'POST',
        body: datos
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            return data;
        });
}

/**
 * Actualiza los datos en la base de datos
 * @param datos los datos a actualizar
 * @param id el id del la propiedad
 */
export const actualizarPropiedades = (datos, id) => {
    fetch(url + `&accion=actualizar&id=${id}`, { // Ejecutamos el método actualizar de la API
        method: 'POST',
        body: datos
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        return data;
    });
}

/**
 * Elimina los datos en la base de datos
 * @param id el id del la propiedad a eliminar
 */
export const eliminarPropiedades = (id) => {
    fetch(url + `&accion=eliminar&id=${id}`, {}) // Ejecutamos el método eliminar de la API
            .then(res => res.json())
            .then(data => {
                console.log(data);
                return data;
            })
}