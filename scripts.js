const notaInput = document.getElementById("notaInput");
const botonNota = document.getElementById("botonNota");
const resultadoNota = document.getElementById("resultadoNota");

if (botonNota) {
  botonNota.addEventListener("click", () => {
    const nota = Number(notaInput.value);
    if (isNaN(nota) || nota < 0 || nota > 10) {
      resultadoNota.textContent = "Introduce una nota válida.";
      resultadoNota.style.color = "red";
      return;
    }
    resultadoNota.textContent = nota >= 5 ? "Aprobado" : "Suspendido";
    resultadoNota.style.color = nota >= 5 ? "green" : "orange";
  });
}

const numBucles = document.getElementById("numBucles");
const botonBucles = document.getElementById("botonBucles");
const listaBucles = document.getElementById("listaBucles");

if (botonBucles) {
  botonBucles.addEventListener("click", () => {
    listaBucles.innerHTML = "";
    const cantidad = Number(numBucles.value);
    if (isNaN(cantidad) || cantidad < 1) return;
    for (let i = 1; i <= cantidad; i++) {
      const li = document.createElement("li");
      li.textContent = "Elemento " + i;
      listaBucles.appendChild(li);
    }
  });
}

const botonDom = document.getElementById("botonDom");
const textoDom = document.getElementById("textoDom");

if (botonDom) {
  botonDom.addEventListener("click", () => {
    textoDom.textContent = "El texto ha sido cambiado.";
  });
}

const cajaEvento = document.getElementById("cajaEvento");

if (cajaEvento) {
  cajaEvento.addEventListener("click", () => {
    cajaEvento.classList.toggle("activo");
  });
}

const botonAleatorio = document.getElementById("botonAleatorio");
const resultadoAleatorio = document.getElementById("resultadoAleatorio");

if (botonAleatorio) {
  botonAleatorio.addEventListener("click", () => {
    const numero = Math.floor(Math.random() * 100) + 1;
    resultadoAleatorio.textContent = "Número generado: " + numero;
  });
}

let listaInscripciones = [];
let indiceEdicion = null;

const campoNombrePersona = document.getElementById("nombrePersona");
const campoActividadSeleccionada = document.getElementById("actividadSeleccionada");
const botonGuardar = document.getElementById("botonGuardar");
const cuerpoTablaInscripciones = document.getElementById("cuerpoTablaInscripciones");

if (botonGuardar) {
  botonGuardar.addEventListener("click", guardarInscripcion);
}

function guardarInscripcion() {
  const nombre = campoNombrePersona.value.trim();
  const actividad = campoActividadSeleccionada.value;
  const turno = document.querySelector('input[name="turnoActividad"]:checked');
  const devolucion = document.querySelector('input[name="Devoluciones"]:checked');

  if (!nombre || !actividad || !turno || !devolucion) return;

  const nueva = {
    nombre,
    actividad,
    turno: turno.value,
    devolucion: devolucion.value
  };

  if (indiceEdicion === null) {
    listaInscripciones.push(nueva);
  } else {
    listaInscripciones[indiceEdicion] = nueva;
    indiceEdicion = null;
    botonGuardar.textContent = "Añadir inscripción";
  }

  limpiarFormulario();
  mostrarInscripciones();
}

function mostrarInscripciones() {
  cuerpoTablaInscripciones.innerHTML = "";
  listaInscripciones.forEach((ins, i) => {
    cuerpoTablaInscripciones.innerHTML += `
      <tr>
        <td>${ins.nombre}</td>
        <td>${ins.actividad}</td>
        <td>${ins.turno}</td>
        <td>${ins.devolucion}</td>
        <td>
          <button onclick="editarInscripcion(${i})">Editar</button>
          <button onclick="borrarInscripcion(${i})">Borrar</button>
        </td>
      </tr>
    `;
  });
}

function limpiarFormulario() {
  campoNombrePersona.value = "";
  campoActividadSeleccionada.value = "";
  document.querySelectorAll('input[name="turnoActividad"]').forEach(r => r.checked = false);
  document.querySelectorAll('input[name="Devoluciones"]').forEach(r => r.checked = false);
}

function borrarInscripcion(i) {
  listaInscripciones.splice(i, 1);
  mostrarInscripciones();
}

function editarInscripcion(i) {
  const ins = listaInscripciones[i];
  campoNombrePersona.value = ins.nombre;
  campoActividadSeleccionada.value = ins.actividad;

  document.querySelector(`input[name="turnoActividad"][value="${ins.turno}"]`).checked = true;
  document.querySelector(`input[name="Devoluciones"][value="${ins.devolucion}"]`).checked = true;

  indiceEdicion = i;
  botonGuardar.textContent = "Guardar cambios";
}
