const formulario = document.querySelector("#form-tarea");
const entrada = document.querySelector("#input-tarea");
const lista = document.querySelector("#lista-tareas");
const contador = document.querySelector("#contador");

function actualizarContador() {
  const pendientes = lista.querySelectorAll('input[type="checkbox"]:not(:checked)').length;
  const numero = document.createElement("strong");
  numero.textContent = pendientes;
  contador.replaceChildren(numero, pendientes === 1 ? " tarea pendiente" : " tareas pendientes");
}

function crearTarea(descripcion) {
  const tarea = document.createElement("li");
  tarea.className = "tarea";

  const casilla = document.createElement("input");
  casilla.type = "checkbox";
  casilla.setAttribute("aria-label", `Marcar como completada: ${descripcion}`);
  const texto = document.createElement("span");
  texto.className = "texto";
  texto.textContent = descripcion;

  const boton = document.createElement("button");
  boton.type = "button";
  boton.className = "btn btn-eliminar";
  boton.textContent = "Eliminar";

  tarea.append(casilla, texto, boton);
  return tarea;
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const descripcion = entrada.value.trim();
  if (descripcion ===== "") {
    entrada.value = "";
    entrada.reportValidity();
    return;
  }

  lista.append(crearTarea(descripcion));
  formulario.reset();
  entrada.focus();
  actualizarContador();
});

// La lista recibe los eventos de las tareas iniciales y de las nuevas.
lista.addEventListener("change", (evento) => {
  const casilla = evento.target;
  if (casilla.matches('input[type="checkbox"]')) {
    casilla.closest(".tarea").classList.toggle("completada", casilla.checked);
    actualizarContador();
  }
});

lista.addEventListener("click", (evento) => {
  const boton = evento.target.closest(".btn-eliminar");
  if (boton) {
    boton.closest(".tarea").remove();
    actualizarContador();
  }
});

actualizarContador();
