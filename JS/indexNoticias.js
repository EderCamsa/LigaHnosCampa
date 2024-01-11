var config = {
  apiKey: 'AIzaSyBVU0vF5BRrn1veinmDRjFh9vW-a9KtpNQ',
    authDomain: 'ligacampa.firebaseapp.com',
    projectId: 'ligacampa',
  databaseURL: 'https://ligacampa-default-rtdb.firebaseio.com/',
  storageBucket: 'ligacampa.appspot.com'
};
firebase.initializeApp(config);

var db = firebase.firestore();


  function obtenerNoticias(){

    db.collection("news").get().then((querySnapshot)=>{
        var contenedor=document.getElementById("contenedorCardsNoticias");

        contenedor.removeChild(contenedor.firstChild);
        var documentos=[];
         querySnapshot.forEach((doc)=>{
            documentos.push(doc);
            })
        var divRow=document.createElement("div");
        divRow.classList.add("row");

        documentos.forEach(function(doc) {
            if(doc.id!="nro")
                {
                var divCol=document.createElement("div");
                divCol.classList.add("col-md-12");
                divCol.classList.add("col-lg-6");
                divCol.id=doc.id;                           //id
                var nroNoticia=(doc.id).slice(7);

                var aEnlace=document.createElement("a");


                var divCard=document.createElement("div");
                divCard.classList.add("card");
                aEnlace.onclick=function(){
                    var docRef=db.collection("news").doc("nro");
                    docRef.get().then((documento)=>{
                        if(documento.exists){
                        db.collection("news").doc("nro").update({
                        number: nroNoticia
                        })
                        //console.log("update!");
                        }       
                    else{
                        console.log("No update!");
                    }              
                    })    
                    window.open("noticia-plantilla.html");
                }

                //aEnlace.classList.add("links");
                //aEnlace.href="noticia-plantilla.html";

                var imagenCard=document.createElement("img");
                imagenCard.classList.add("card-img-top");
                imagenCard.src=doc.data().imagen;
                imagenCard.width="250";
                imagenCard.height="150";
                imagenCard.alt="Card image cap";

                var divCardBody=document.createElement("div");
                divCardBody.classList.add("card-body");

                var h5Titulo=document.createElement("h5");
                h5Titulo.textContent=doc.data().titulo;

                var pContenido=document.createElement("p");
                pContenido.classList.add("card-text");
                pContenido.textContent=doc.data().resumen;

                divCardBody.appendChild(h5Titulo);
                divCardBody.appendChild(pContenido);

                aEnlace.appendChild(imagenCard);
                aEnlace.appendChild(divCardBody);

                //divCard.appendChild(imagenCard);
                //divCard.appendChild(divCardBody);
                
                //divCol.appendChild(divCard);

                divCard.appendChild(imagenCard);
                divCard.appendChild(divCardBody);
                
                aEnlace.appendChild(divCard);
                divCol.appendChild(aEnlace);
                
                divRow.appendChild(divCol);
                }
        });
            contenedor.appendChild(divRow);
     });   
}
obtenerNoticias();
function obtenerItemEquipo(){
    db.collection("itemEquipo").get().then((querySnapshot)=>{
        var documentos=[];
        var contenedor=document.getElementById("contenedorItemEquipo");
        document.removeChild(document.firstChild);

        var tablapos=document.createElement("table");
        tablapos.classList.add("default");
        tablapos.id="tablaPosiciones";
        
        var itemRef=document.createElement("tr");
        var pos=document.createElement("th");
        pos.textContent="Pos";
        var icono=document.createElement("th");
        var club=document.createElement("th");
        club.textContent="Club";
        var pts=document.createElement("th");
        pts.textContent="PTS";
        var pj=document.createElement("th");
        pj.textContent="PJ";
        var df=document.createElement("th");
        df.textContent="DF";
        itemRef.appendChild(pos);
        itemRef.appendChild(icono);
        itemRef.appendChild(club);
        itemRef.appendChild(pts);
        itemRef.appendChild(pj);
        itemRef.appendChild(df);
        tablapos.appendChild(itemRef);
        
        

        var contador=1;
         querySnapshot.forEach((doc)=>{
                documentos.push(doc);
         })
         documentos.sort(function(a, b) {
             if(b.data().pts==a.data().pts){
                 if(b.data().pj==a.data().pj){
                     return b.data().df - a.data().df;
                 }
                return b.data().pj - a.data().pj;
             }
            return b.data().pts - a.data().pts;
          });

         var contadorpos=1;
         documentos.forEach(function(doc) {
    
            if(doc.id!="nro")
            {
            var itemEquipo=document.createElement("tr");
            itemEquipo.classList.add("itemImpar");
            if(contador%2!=0)
            {   itemEquipo.classList.add("itemImpar");
            }
            else{
                itemEquipo.classList.add("itemPar");
            }
            contador++;
            var col1=document.createElement("td");
            col1.textContent=contadorpos;    //pos
            contadorpos++;
    
            var col2=document.createElement("td");
            var imgIco=document.createElement("img");
            imgIco.src=doc.data().icono;
            imgIco.width="35";
            imgIco.height="35";
            
            col2.appendChild(imgIco);
    
            var col3=document.createElement("td");
            col3.textContent=doc.id;
    
            var col4=document.createElement("td");
            col4.textContent=doc.data().pts;
    
            var col5=document.createElement("td");
            col5.textContent=doc.data().pj;
    
            var col6=document.createElement("td");
            col6.textContent=doc.data().df;
    
            itemEquipo.appendChild(col1);
            itemEquipo.appendChild(col2);
            itemEquipo.appendChild(col3);
            itemEquipo.appendChild(col4);
            itemEquipo.appendChild(col5);
            itemEquipo.appendChild(col6);
            
            tablapos.appendChild(itemEquipo);
            }
         });
         contenedor.appendChild(tablapos);
     });   
  
}
obtenerItemEquipo();

function obtenerGoleadores() {
  db.collection("ScoreJugador").orderBy("goles", "desc").get().then((querySnapshot) => {
      var contenedor = document.getElementById("contenedorGoleadores");
      var tablaGoleadores = document.createElement("table");
      tablaGoleadores.classList.add("default");
      tablaGoleadores.id = "tablaGoleadores";
      
      var encabezado = document.createElement("tr");
      var thPos = document.createElement("th");
      thPos.textContent = "Pos";
      var thImagen = document.createElement("th");
      var thNombre = document.createElement("th");
      thNombre.textContent = "Nombre";
      var thGoles = document.createElement("th");
      thGoles.textContent = "Goles";
      var thEquipo = document.createElement("th");
      thEquipo.textContent = "Equipo";

      encabezado.appendChild(thPos);
      encabezado.appendChild(thImagen); // Agregar el encabezado de imagen
      encabezado.appendChild(thNombre);
      encabezado.appendChild(thGoles);
      encabezado.appendChild(thEquipo);
      tablaGoleadores.appendChild(encabezado);
      
      let contadorPos = 1;
      querySnapshot.forEach((doc) => {
          var data = doc.data();
          var fila = document.createElement("tr");
          fila.classList.add(contadorPos % 2 === 0 ? "itemPar" : "itemImpar");
          
          var colPos = document.createElement("td");
          colPos.textContent = contadorPos++;
          var colImagen = document.createElement("td");
          var img = document.createElement("img");
          img.src = data.imagen; // Asegúrate de que 'data.imagen' sea la URL de la imagen
          img.width = "35"; // Ajusta el ancho según necesites
          img.height = "35"; // Ajusta la altura según necesites
          colImagen.appendChild(img);
          var colNombre = document.createElement("td");
          colNombre.textContent = doc.id; // Asumiendo que el nombre del jugador es el ID del documento
          var colGoles = document.createElement("td");
          colGoles.textContent = data.goles;
          var colEquipo = document.createElement("td");
          colEquipo.textContent = data.equipo;

          fila.appendChild(colPos);
          fila.appendChild(colImagen); // Agregar la columna de imagen a la fila
          fila.appendChild(colNombre);
          fila.appendChild(colGoles);
          fila.appendChild(colEquipo);
          
          tablaGoleadores.appendChild(fila);
      });

      contenedor.appendChild(tablaGoleadores);
  }).catch(error => {
      console.error("Error obteniendo los goleadores: ", error);
  });
}

// Esta línea asegura que la función se ejecute cuando se cargue la ventana
window.onload = obtenerGoleadores;

