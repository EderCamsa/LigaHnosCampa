// Inicializar Firebase
if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: 'AIzaSyBVU0vF5BRrn1veinmDRjFh9vW-a9KtpNQ',
      authDomain: 'ligacampa.firebaseapp.com',
      projectId: 'ligacampa',
      //... (otros campos de configuración si son necesarios)
    });
  } else {
    firebase.app(); // Si ya está inicializada, usa esa instancia.
  }
  
  var db = firebase.firestore();
  
  document.addEventListener('DOMContentLoaded', function() {
    // Ejecuta las funciones que cargan la noticia y los comentarios cuando el DOM esté listo
    obtenerNroNoticia();
  });
  
  var db = firebase.firestore();
var nameV="anonimo", textV;
/*var dateV = date.toLocaleDateString("es-CL", {
    weekday: "long", // narrow, short
    year: "numeric", // 2-digit
    month: "short", // numeric, 2-digit, narrow, long
    day: "numeric", // 2-digit
    timeZone: "America/Santiago",
    hour12: true, // false
    hour: "numeric", // 2-digit
    minute: "2-digit", // numeric
    second: "2-digit" // numeric
});*/

function Ready(){
    textV = document.getElementById('exampleFormControlTextarea1').value;
    
}
let listaIds=[];
    document.getElementById('btnComentar').onclick=function(){
        const date = new Date();

    var dateV =
    date.getFullYear()+"/"+
   ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
  ("00" + date.getDate()).slice(-2) + " " +
  ("00" + date.getHours()).slice(-2) + ":" +
  ("00" + date.getMinutes()).slice(-2) + ":" +
  ("00" + date.getSeconds()).slice(-2);


        Ready();
        var idDocumento;
        var docRef = db.collection("news").doc("nro");
        docRef.get().then((doc) => {
        if (doc.exists) {
            idDocumento="noticia".concat((doc.data().number).toString());
            db.collection("news").doc(idDocumento).collection("messages").add({                         ////
                name: nameV,
                date: dateV,
                text: textV
            })
            .then((docRef) => {
                //console.log("Document written with ID: ", docRef.id);
                listaIds.push(docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
           
        }
        });
        actualizarMensajes();

    }
    
 

   class Media{
            constructor(id,name,date,text)
            {   this.name=name;
                this.date=date;
                this.text=text;
                this.id=id;
            }
            forHtml() {
            this.divMedia=document.createElement("div");
            this.divMedia.classList.add("media");
            this.divMedia.id=this.id;
            
            this.divRow=document.createElement("div");
            this.divRow.classList.add("row");

            this.divCol1=document.createElement("div");
            this.divCol1.classList.add("col-sm-4");
            this.divCol1.classList.add("col-md-3");
            
            this.imgUser=document.createElement("img");
            this.imgUser.classList.add("fotoUser");
            this.imgUser.src="recursos/Usuario.png";
            this.imgUser.width="64";
            this.imgUser.height="64";
            this.imgUser.alt="";
            
            this.divCol1.appendChild(this.imgUser);

            this.divCol2=document.createElement("div");
            this.divCol2.classList.add("col-sm-8");
            this.divCol2.classList.add("col-md-9");
            
            this.divMediaBody=document.createElement("div");
            this.divMediaBody.classList.add("media-body");
            
                this.nombreMediaInicio=document.createElement("p");
                this.nombreMediaInicio.classList.add("nombre");this.nombreMediaInicio.classList.add("mediaInicio");
                this.nombreMediaInicio.textContent=this.name ;
                
                this.span1=document.createElement("span");
                this.span1.textContent=" "+this.date;
                this.nombreMediaInicio.appendChild(this.span1);        
                
                this.comentarioMediaInicio=document.createElement("p");
                this.comentarioMediaInicio.classList.add("comentario");this.comentarioMediaInicio.classList.add("mediaInicio");
                this.comentarioMediaInicio.textContent=this.text;

                this.botonMediaFin=document.createElement("div");
                this.botonMediaFin.classList.add("botones"); this.botonMediaFin.classList.add("mediaFin");

                this.botonResponder=document.createElement("a");
                this.botonResponder.classList.add("opcionComentarios");
                this.botonResponder.href="#";
                this.botonResponder.textContent="";
                this.botonMediaFin.appendChild(this.botonResponder);
                
                this.divMediaBody.appendChild(this.nombreMediaInicio);
                this.divMediaBody.appendChild(this.comentarioMediaInicio);
                this.divMediaBody.appendChild(this.botonMediaFin);
                
                this.divCol2.appendChild(this.divMediaBody);
                
                this.divRow.appendChild(this.divCol1);this.divRow.appendChild(this.divCol2);

                this.divMedia.appendChild(this.divRow);
            return this.divMedia;
            }
    }
    /*parte de comentarios */
    function actualizarMensajes(){
        var idDocumento;
        var docRef = db.collection("news").doc("nro");
        docRef.get().then((doc) => {
        if (doc.exists) {
            idDocumento="noticia".concat((doc.data().number).toString());

            db.collection("news").doc(idDocumento).collection("messages").get().then((querySnapshot)=>{                         ////
                var contenedor=document.getElementById("contenedorComentarios");
                while (contenedor.firstChild) {
                    contenedor.removeChild(contenedor.firstChild);
                }
                 var mensajes=[];
                 querySnapshot.forEach((doc)=>{
                    mensajes.push(doc); 
                 })
                 mensajes.sort(function(a,b){
                var fechaA=new Date(a.data().date);
                var fechaB=new Date(b.data().date);
                
                return fechaB-fechaA;
                 });
                 mensajes.forEach(function(doc){
                     var media=new Media(doc.id,doc.data().name,doc.data().date,doc.data().text);
                     contenedor.appendChild(media.forHtml());
                 });
             });
           
        }
        });
        
        
    }

   function actualizarNoticia(docu){
    spanNoticia=document.getElementById("texto-noticia");
    tituloNoticia=document.getElementById("titulo-noticia");
    imgNoticia=document.getElementById("imagen-noticia");
    var docRef = db.collection("news").doc(docu);
    actualizarMensajes();
    docRef.get().then((doc) => {
        if (doc.exists) {
            //console.log("Document data:", doc.data());
            spanNoticia.textContent=doc.data().texto;
            tituloNoticia.textContent=doc.data().titulo;
            imgNoticia.src=doc.data().imagen;
        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    }


function obtenerNroNoticia(){
    var docRef = db.collection("news").doc("nro");
    docRef.get().then((doc) => {
        if (doc.exists) {
            docu="noticia".concat((doc.data().number).toString());
            actualizarNoticia(docu);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    //contenedor mas noticias
    db.collection("news").get().then((querySnapshot)=>{
        var contenedor=document.getElementById("contenedorMasNoticias");
        while (contenedor.firstChild) {
            contenedor.removeChild(contenedor.firstChild);
        }
         querySnapshot.forEach((doc)=>{
             if(docu!=doc.id && "nro"!=doc.id)
             {   var divNoticia=document.createElement("div");
                divNoticia.classList.add("card2");
                divNoticia.id=doc.id;
                var nroNoticia=(doc.id).slice(7);
                var imgNoticia=document.createElement("img");
                imgNoticia.classList.add("card2-img-top");
                imgNoticia.width="150";
                imgNoticia.height="100";
                imgNoticia.src=doc.data().imagen;
                var divContenido=document.createElement("div");
                divContenido.classList.add("card2-body");
                divContenido.textContent=doc.data().resumen;
                divNoticia.appendChild(imgNoticia);
                divNoticia.appendChild(divContenido);
                divNoticia.onclick=function(){
                    var imagen=document.getElementById("imagen-noticia");
                    imagen.src="recursos/loading.gif";
                    var docRef=db.collection("news").doc("nro");
                    docRef.get().then((doc)=>{
                        if(doc.exists){
                        db.collection("news").doc("nro").update({
                        number: nroNoticia
                        })
                        console.log("update!");
                        obtenerNroNoticia();
                    }       
                    else{
                        console.log("No update!");
                    }              
                    })
                    .catch((error)=>{console.log("error getting document:",error);
                    });   
                }
                contenedor.appendChild(divNoticia);
             }
         })
     });   
}
obtenerNroNoticia();
