const socket = io();

// * Selectors

const addMessages = ()=> {
  const msj = {
    nombre: document.querySelector('#name').value,
    mensaje: document.querySelector('#mensaje').value
  }
  console.log(msj);
  return false
}
