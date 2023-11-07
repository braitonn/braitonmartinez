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
    const articulos = await obtenerArticulos();
    console.log(articulos);
    const listado = document.querySelector("#listado"); // getElementById("listado")
    listado.innerHTML = '';
    for (let articulo of articulos) {
      listado.innerHTML += `
                <div class="col">
                  <div class="card" style="width:18rem;">
                      <img src="imagenes/productos/${articulo.imagen ?? 'nodisponible.png'}" alt="${articulo.nombre}" class="card-img-top">
                      <div class="card-body">
                          <h5 class="card-title">
                              <span name="spancodigo">${articulo.codigo}</span> - <span name="spannombre">${articulo.nombre}</span>
                          </h5>
                          <p class="card-text">
                              ${articulo.descripcion}.
                          </p>
                          <h5>$ <span name="spanprecio">${articulo.precio}</span></h5>
                          <input type="number" name="inputcantidad" class="form-control" value="0" min="0" max="30" onchange="calcularPedido()">
                      </div>
                  </div>
              </div>
  `;
    }
  }