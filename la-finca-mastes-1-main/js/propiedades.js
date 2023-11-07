// Constante para la URL de la API
const url = './api/datos.php?tabla=propiedades&accion=seleccionar';

// Función para obtener los datos
export async function obtenerPropiedades() {
  let res = await fetch(`${url}`);
  let datos = await res.json();
  if( res.status !== 200) {
    throw Error ('Los datos no existen');
  }
  //console.log(datos);
  return datos;
}