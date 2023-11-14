import { obtenerPropiedades } from "../js/propiedades";

const url = './api/datos.php?tabla=propiedades';

// Alerta
const alerta = document.querySelector('#alerta');

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
const inputCodpost = document.querySelector("#codpost");
const inputLocalidad = document.querySelector("#localidad");
const inputProvincia = document.querySelector("#provincia");
const inputFoto = document.querySelector("#foto");
const inputObservacioes = document.querySelector("#observaciones");
const inputPropietario_id = document.querySelector("#propietario_id");
const inputInquilino_id = document.querySelector("#inquilino_id");

document.addEventListener("DOMContentLoaded", () => {
    mostrarPropiedades();
});

/**
 * Obtiene los artículos y los muestra
 */
async function mostrarArticulos() {
    const propiedades = await obtenerPropiedades();
    console.log(propiedades);
    const listado = document.querySelector("#listado"); // getElementById("listado")
    listado.comprarHTML = '';
    for (let propiedades of propiedades) {
      listado.comprarHTML += `
      <div class="col">
        <div class="card" style="width:18rem;">
            <img src="imagenes/productos/${propiedades.Foto ?? 'nodisponible.png'}" alt="${propiedades.tipo}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">
                    <span name="spancodigo">${propiedades.id}</span> - <span name="spantipo">${propiedades.tipo}</span>
                </h5>
                <p class="card-text">
                    ${articulo.descripcion}.
                </p>
                <input type="number" name="inputtipo" class="form-control" value="0" min="0" max="30" onchange="calcularPedido()">
            </div>
        </div>
    </div>
`;
    }
  }

  /**
 * Ejecuta el evento submit del formulario
 */
formulario.addEventListener('submit', function(e) {
    e.preventDefault();     // Prevenimos la acción por defecto
    const datos = new FormData(formulario); // Guardamos los datos del formulario
    fetch(url + '&accion=insertar', {
        method: 'POST',
        body: datos
    })
    .then(res => res.json())
    .then(data => {
        insertarAlerta(data, 'success');
        mostrarPropiedades();
    })
})

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
    inputCodpost.value = null;
    inputLocalidad.value = null;
    inputProvincia.value = null;
    inputFoto.value = null;
    inputObservacioes.value = null;
    inputPropietario_id.value = null;
    inputInquilino_id.value = null;
    frmImagen.src = './imagenes/productos/nodisponible.png';

    // Mostramos el formulario
    formularioModal.show();
})
    //faltan cosas por poner
    
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
}