window.onload = function(){
	let xhttp = new XMLHttpRequest();
	xhttp.open("GET","linea.xml");
	xhttp.send();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState==4 && xhttp.status==200) {
			crearLinea(xhttp.responseXML);
		}
	}
}
function crearLinea(xmlDoc){
	let mate = xmlDoc.documentElement.childNodes;
	let datos = [];
	//
	for (let i = 0; i < mate.length; i++) {
		if (mate[i].nodeType==1) {
			m = mate[i].childNodes;
			datos.push({
				apellido:m[1].childNodes[0].nodeValue,
				nombre:m[3].childNodes[0].nodeValue,
				nacimiento:parseInt(m[5].childNodes[0].nodeValue),
				fallecimiento:parseInt(m[7].childNodes[0].nodeValue),
				imagen:m[9].childNodes[0].nodeValue,
				biografia:m[11].childNodes[0].nodeValue,
			});
		}
	}
	delete mate, xmlDoc;
	//
	datos.sort(function(a,b){
		if (a.nacimiento > b.nacimiento) {
			return -1;
		}
		if (a.nacimiento < b.nacimiento) {
			return 1;
		}
		return 0;
	});
	let linea = document.getElementById("linea");
	let der = false;
	//
	datos.forEach(a =>{
		let contenedor = document.createElement("div");
		if (der) {
			contenedor.setAttribute("class", "contenedor der");
		} else {
			contenedor.setAttribute("class", "contenedor izq");
		}
		der = !der;
		let contenido = document.createElement("div");
		contenido.setAttribute("class","contenido");
		//
		let h2 = "<h2>"+a.nombre+" "+a.apellido+" "+a.nacimiento+"-"+a.fallecimiento+"</h2>";
		let p = "<p><img src='img/"+a.imagen+"' height='80' style='float:left; margin-right:10px;'>"+a.biografia+"</p>";
		contenido.innerHTML = h2+p;
		contenedor.appendChild(contenido);
		linea.appendChild(contenedor);
	});
}