import { seleccionarPropiedades, insertarPropiedades, eliminarPropiedades } from "../modelos/propiedades";

const url = './api/datos.php?tabla=propiedades';

// Alerta
const alerta = document.querySelector('#alerta') ;

// Formulario
const formulario = document.querySelector('#formulario');
const formularioModal = new bootstrap.Modal(document.querySelector('#formularioModal'));
const btnNuevo = document.querySelector('#btnNuevo');

// Inputs
const inputId = document.querySelector("#id");
const inputTipo = document.querySelector("#tipo");
const inputDireccion = document.querySelector("#direccion");
const inputPiso = document.querySelector("#piso");
const inputDepartamento = document.querySelector("#departamento");
const inputCodpos = document.querySelector("#codpos");
const inputLocalidad = document.querySelector("#localidad");
const inputProvincia = document.querySelector("#provincia");
const inputFoto = document.querySelector("#foto");
const inputObservaciones = document.querySelector("#observaciones");
const inputPropietario_id = document.querySelector("#propietario_id");
const inputInquilino_id = document.querySelector("#inquilino_id");

document.addEventListener("DOMContentLoaded", () => {
    mostrarPropiedades();
});

// Imagen del formulario
const frmImagen = document.querySelector("#frmimagen");

/**
 * Obtiene los artículos y los muestra
 */
async function mostrarPropiedades() {
    const Propiedades = await seleccionarPropiedades();
    console.log(Propiedades);
    const listado = document.querySelector("#listado"); // getElementById("listado")
    listado.innerHTML = '';
    for (let propiedad of Propiedades) {
      if(logueado) {
          listado.innerHTML += `
                    <div class="col">
                      <div class="card" style="width:18rem;">
                          <img src="imagenes/propiedades/${propiedades.foto??'nodisponible.png'}" alt="${propiedades.tipo}" class="card-img-top">
                          <div class="card-body">
                              <h5 class="card-title">
                                  <span name="spancodigo">${propiedades.codigo}</span> - <span name="spantipo">${propiedades.tipo}</span>
                              </h5>
                              <p class="card-text">
                                  ${propiedades.descripcion}.
                              </p>
                              <h5>$ <span name="spancodpos">${propiedades.codpos}</span></h5>
                          </div>
                          <div class="card-footer d-flex justify-content-center">
                              <a class="btnEditar btn btn-primary">Editar</a>
                              <a class="btnBorrar btn btn-danger">Borrar</a>
                              <input type="hidden" class="idPropiedades" value="${propiedades.id}">
                              <input type="hidden" class="fotoPropiedades" value="${propiedades.foto??'nodisponible.png'}">
                          </div>
                      </div>
                  </div>
                  `;
      } else {
          listado.innerHTML += `
                    <div class="col">
                      <div class="card" style="width:18rem;">
                          <img src="imagenes/productos/${propiedades.foto??'nodisponible.png'}" alt="${propiedades.tipo}" class="card-img-top">
                          <div class="card-body">
                              <h5 class="card-title">
                                  <span name="spancodigo">${propiedades.codigo}</span> - <span name="spantipo">${propiedades.tipo}</span>
                              </h5>
                              <p class="card-text">
                                  ${propiedades.descripcion}.
                              </p>
                              <h5>$ <span name="spancodpos">${propiedades.codpos}</span></h5>
                          </div>
                      </div>
                  </div>
                  `;
      }
    }
  }
  
  /**
 * Ejecuta el evento submit del formulario
 */
formulario.addEventListener('submit', function(e) {
    e.preventDefault();     // Prevenimos la acción por defecto
    const datos = new FormData(formulario); // Guardamos los datos del formulario
    switch(opcion) {
        case 'insertar':
            mensajeAlerta = `Datos guardados`;
            insertarPropiedades(datos);                        
            break;
        case 'actualizar':
            mensajeAlerta = `Datos actualizados`;
            actualizarPropiedades(datos, id);
            break;
    }
    insertarAlerta(mensajeAlerta, 'success');
    mostrarPropiedades();
});

/**
 * Ejecuta el evento click del Botón Nuevo
 */
btnNuevo.addEventListener('click', () => {
    // Limpiamos los inputs
    inputId.value = null;
    inputTipo.value = null;
    inputDireccion.value = null;
    inputPiso.value = null;
    inputDepartamento.value = null;
    inputCodpos.value = null;
    inputLocalidad.value = null;
    inputProvincia.value = null;
    inputFoto.value = null;
    inputObservaciones.value = null;
    inputPropietario_id.value = null;
    inputInquilino_id.value = null;
    frmImagen.src = './imagenes/productos/nodisponible.png';

    // Mostramos el formulario
    formularioModal.show();

    opcion = 'incertar';
});

/**
 * Define el mensaje de alerta
 * @param mensaje el mensaje a mostrar
 * @param tipo el tipo de alerta
 */
const insertarAlerta = (mensaje, tipo) => {
    const envoltorio = document.createElement('div');
    envoltorio.innerHTML = `
    <div class="alert alert-${tipo} alert-dismissible" role="alert">
        <div>${mensaje}</div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `;
    alerta.append(envoltorio);
};

/** 
 * Función on para determinar en qué elemento se realiza un evento 
 * @param elemento el elemento al que se sealiza el evento 
 * @param evento el evento realizado
 * @param selector el selector seleccionado
 * @param manejador el método que maneja el evento
 */
const on = (elemento, evento, selector, manejador) => {
    elemento.addEventListener(evento, e => {
        if (e.target.closest(selector)) {
            manejador(e);
        }
    })
}

/** 
 * Ejecutamos la función on para el botón Editar 
 */

on(document, 'click', '.btnEditar', e => {
    const cardFooter = e.target.parentNode; // Guardamos el elemento padre del botón

    // Obtenemos los datos del artículo seleccionado
    id = cardFooter.querySelector('.idPropiedad').value;
    const tipo = cardFooter.parentNode.querySelector('span[name=spantipo]').innerHTML;
    const direccion = cardFooter.parentNode.querySelector('span[name=spandireccion]').innerHTML;
    const piso = cardFooter.parentNode.querySelector('.card-text').innerHTML;
    const departamento = cardFooter.parentNode.querySelector('span[name=spancodpos]').innerHTML;
    const foto = cardFooter.querySelector('.fotoPropiedad').value;

    // Asignamos los valores a los input del formulario
    inputId.value = Id;
    inputTipo.value = Tipo;
    inputDireccion.value = Direccion;
    inputPiso.value = Piso;
    inputDepartamento.value = Departamento;
    inputCodpos.value = Codpos;
    inputLocalidad.value = Localidad;
    inputProvincia.value = Provincia;
    inputFoto.value = Foto;
    inputObservaciones.value = Observaciones;
    inputPropietario_id.value = Propietario_id;
    inputInquilino_id.value = Inquilino_id;
    frmImagen.src = `./imagenes/productos/${imagen}`;
    formularioModal.show(); // Mostramos el formulario
    opcion = 'actualizar';

})

/**
 *  Ejecutamos la función on para el botón Borrar
 */
on(document, 'click', '.btnBorrar', e => {
    const cardFooter = e.target.parentNode; // Guardamos el elemento padre del botón
    id = cardFooter.querySelector('.idArticulo').value; // Obtenemos el id del artículo
    const nombre = cardFooter.parentNode.querySelector('span[name=spannombre]').innerHTML; // Obtenemos el nombre del artículo
    let aceptar = confirm(`¿Realmente desea eliminar a ${nombre}`); // Pedimos confirmación para eliminar
    if (aceptar) {
        eliminarPropiedades(id);
        insertarAlerta(`${nombre}  borrado`, 'danger');
        mostrarPropiedades();
    }
})