firebase.initializeApp({
    apiKey: 'AIzaSyBVU0vF5BRrn1veinmDRjFh9vW-a9KtpNQ',
    authDomain: 'ligacampa.firebaseapp.com',
    projectId: 'ligacampa'
  });
  var db = firebase.firestore();




function obtenerFechas(){
    var fecha="fecha";
    var i=10;
    var f=17;
    while(i<=f){

        var fechaCompleta= fecha+i;
     
    db.collection("fechas").doc(fechaCompleta).collection("partidos").get().then((querySnapshot)=>{
        var documentos=[];
        querySnapshot.forEach((doc)=>{
           
            documentos.push(doc);
        })
        var fechaPartido = "";
        documentos.forEach(function(doc){
if(fechaPartido!=doc.data().nrofecha){
    var div=document.createElement("div");
    div.classList.add("fechapartido")
    div.textContent="Fecha "+doc.data().nrofecha.toString();
    document.getElementById("tablaPosiciones").appendChild(div);
    fechaPartido=doc.data().nrofecha;   

}       
            
            var contenedor=document.getElementById("tablaPosiciones");
            
            var tr=document.createElement("tr");
            tr.classList.add("itemImpar")
            var td1=document.createElement("td");
            //td1.textContent=doc.data().iconoA;
            var imagA=document.createElement("img");
            imagA.src=doc.data().iconoA;
            imagA.width="35";
            imagA.height="35";
            td1.appendChild(imagA);
            var td2=document.createElement("td");
            td2.textContent=doc.data().equipoA;
            var td3=document.createElement("td");
            td3.textContent=doc.data().golesA;
            var td4=document.createElement("td");
            td4.textContent=doc.data().fecha;
            var td5=document.createElement("td");
            td5.textContent=doc.data().golesB;
            var td6=document.createElement("td");
            td6.textContent=doc.data().equipoB;
            var td7=document.createElement("td");
            var imagB=document.createElement("img");
            //td7.textContent=doc.data().iconoB;
            imagB.src=doc.data().iconoB;
            imagB.width="35";
            imagB.height="35";
            td7.appendChild(imagB);
  

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tr.appendChild(td6);
            tr.appendChild(td7);

            contenedor.appendChild(tr);

          
        });
    })
i++;
}
}
obtenerFechas();
