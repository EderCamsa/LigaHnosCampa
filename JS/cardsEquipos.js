firebase.initializeApp({
  apiKey: 'AIzaSyBVU0vF5BRrn1veinmDRjFh9vW-a9KtpNQ',
  authDomain: 'ligacampa.firebaseapp.com',
  projectId: 'ligacampa'
});
var db = firebase.firestore();

// Función para formatear el ID para ser usado en el DOM
function formatIdForHtml(id) {
  return id.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-_]/g, '');
}

function obtenerEquipos() {
  db.collection("itemEquipo").get().then((querySnapshot) => {
    var contenedor = document.getElementById("contenedorEquipos");
    while (contenedor.firstChild) {
      contenedor.removeChild(contenedor.firstChild);
    }

    querySnapshot.forEach((doc) => {
      console.log(doc.id);
      var divColumna = document.createElement("div");
      divColumna.classList.add("col-md-8", "col-lg-4", "columnaCentrada");

      var divCardEquipo = document.createElement("div");
      divCardEquipo.classList.add("card", "equipo");
      divCardEquipo.id = formatIdForHtml(doc.id); // Usando la función para formatear el ID

      var imgIcono = document.createElement("img");
      imgIcono.classList.add("card-img-top");
      imgIcono.src = doc.data().icono;
      imgIcono.width = "90";
      imgIcono.height = "90";
      imgIcono.alt = "Card image cap";

      var divCardBody = document.createElement("div");
      divCardBody.classList.add("card-body");

      var h5Nombre = document.createElement("h5");
      h5Nombre.classList.add("card-title", "text-center");
      h5Nombre.textContent = doc.id; // El nombre del equipo como texto del elemento

      divCardBody.appendChild(h5Nombre);

      var datos = doc.data().datos;
      var palabras = datos.split('-'); // Dividir la cadena de datos en un array de palabras
      palabras.forEach(function(palabra) {
        if (palabra.trim() !== "") {
          var pDatos = document.createElement("p");
          pDatos.textContent = palabra;
          divCardBody.appendChild(pDatos);
        }
      });

      divCardEquipo.appendChild(imgIcono);
      divCardEquipo.appendChild(divCardBody);
      divColumna.appendChild(divCardEquipo);
      contenedor.appendChild(divColumna);
    });
  });
}

document.addEventListener('DOMContentLoaded', (event) => {
  obtenerEquipos();
});
