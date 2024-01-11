firebase.initializeApp({
    apiKey: 'AIzaSyBVU0vF5BRrn1veinmDRjFh9vW-a9KtpNQ',
    authDomain: 'ligacampa.firebaseapp.com',
    projectId: 'ligacampa'
  });
  var db = firebase.firestore();


  function obtenerNoticias(){

    db.collection("news").get().then((querySnapshot)=>{
        var contenedor=document.getElementById("carouselExampleControls");

        var carousel=document.createElement("div");
        carousel.classList.add("carousel-inner");
        /*
        while (contenedor.firstChild) {
            contenedor.removeChild(contenedor.firstChild);
        }*/
        var documentos=[];
        var primerItem=document.createElement("div");
         querySnapshot.forEach((doc)=>{
                documentos.push(doc);
         })
        documentos.forEach(function(doc) {
            if(doc.id!="nro")
                {
                var nroNoticia=(doc.id).slice(7);
                var divItem=document.createElement("div");
                divItem.classList.add("carousel-item");
                divItem.onclick=function(){
                  var docRef=db.collection("news").doc("nro");
                  docRef.get().then((documento)=>{
                      if(documento.exists){
                      db.collection("news").doc("nro").update({
                      number: nroNoticia
                      })
                      console.log("update!");
                      }       
                  else{
                      console.log("No update!");
                  }              
                  })    
                  window.open("noticia-plantilla.html");
              }
                //divItem.classList.add("active");
                
                var aItem=document.createElement("a");
                var imgItem=document.createElement("img");
                imgItem.src=doc.data().imagen;
                imgItem.classList.add("rounded");
                imgItem.classList.add("mx-auto");
                imgItem.classList.add("d-block");
                imgItem.width="800";
                imgItem.height="500";
                imgItem.alt="...";

                var divCaption=document.createElement("div");
                divCaption.classList.add("carousel-caption");
                divCaption.classList.add("d-md-block");
                
                var h5Caption=document.createElement("h5");
                h5Caption.classList.add("texto-noticias");
                h5Caption.textContent=doc.data().titulo;

                var pCaption=document.createElement("p");
                pCaption.classList.add("texto-noticias");
                pCaption.textContent=doc.data().resumen;
                
                divCaption.appendChild(h5Caption);
                divCaption.appendChild(pCaption);

                aItem.appendChild(imgItem);

                divItem.appendChild(aItem);
                divItem.appendChild(divCaption);
                carousel.appendChild(divItem);
                
                }
        });     
                primerItem=carousel.firstChild;
                primerItem.classList.add("active");
                contenedor.appendChild(carousel);
              

        });   
}
obtenerNoticias();
