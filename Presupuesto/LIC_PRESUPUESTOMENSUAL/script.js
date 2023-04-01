/*definimos la funcion, para poder obtener el mes y anio actual de la computadora del usuario*/
function getInitialDate() {
  let tituloHeader = document.getElementById("tituloDeFecha");
  const fecha = new Date();
  const nombreMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  tituloHeader.innerHTML = `Presupuesto de ${nombreMeses[fecha.getMonth()]} ${fecha.getFullYear()}`
}

getInitialDate();

// Declaración de variables
let totalIngresos = 0;
let totalEgresos = 0;
let porcentajeDeGastos = 0;
let tabActiva = "Ingresos";

let ingresos = [];

// Cambiando de pestaña
const tabIngresos = document.getElementById("tab-ingresos");
const tabEgresos = document.getElementById("tab-egresos");

function obtenerEstado() {
  obtenerIngresos();
  if (tabActiva === "Ingresos") {
    tabIngresos.style.background = "black";
    tabIngresos.style.color = "white";

    tabEgresos.style.background = "#e5e7eb";/*Gris claro*/
    tabEgresos.style.color = "black";
  } else {
    tabEgresos.style.background = "black";
    tabEgresos.style.color = "white";

    tabIngresos.style.background = "#e5e7eb";
    tabIngresos.style.color = "black";
  }
}

obtenerEstado()

tabIngresos.addEventListener("click", () => {
  tabActiva = "Ingresos";
  obtenerEstado();
});

tabEgresos.addEventListener("click", () => {
  tabActiva = "Egresos";
  obtenerEstado();
});

// Obteniendo los datos
function obtenerIngresos() {
  const ingresosLista = document.getElementById("lista");
  let lista = "";
  let ingresosFiltrados = ingresos.filter((el) => { return el.tipo === tabActiva });

  ingresosFiltrados.forEach((el) => {
    lista += `
    <div class="border p-3 flex justify-between">
            <span> ${el.descripcion} </span>
            <span>+${el.monto}</span>
            <span>+${el.porcentajeGastos}</span>
    </div>
    `
  });

  ingresosLista.innerHTML = lista /*la lista de ingresos filtrados se mostrará en la página web.*/
}

obtenerIngresos();

// Obtener elementos de html
const ingresoTipo = document.getElementById('ingreso-tipo');
const ingresoDescripcion = document.getElementById("descripcion");
const ingresoMonto = document.getElementById("monto");
const btnAgregar = document.getElementById("agregar");

btnAgregar.addEventListener("click", () => {
  agregar();
})

function agregar() {
  let valores = {
    tipo: '',
    descripcion: '',
    monto: '',
    porcentajeGastos: ''
  };

  valores.tipo = ingresoTipo.options[ingresoTipo.selectedIndex].text;
  valores.descripcion = ingresoDescripcion.value;
  valores.monto = parseInt(ingresoMonto.value);

  if (valores.descripcion == 0 || valores.descripcion == ""){
    alert("El campo descripcion es obligatorio");
  }else if(valores.monto == "" || isNaN(valores.monto)|| valores.monto <= 0){
  alert("El campo monto debe ser mayor a 0 y no debe estar vacío");
  }else {  
    // Calcular porcentaje de gastos
    let ingresosFiltrados = ingresos.filter((el) => {
      return el.tipo === "Ingresos"
    });
  
    let egresosFiltrados = ingresos.filter((el) => {
      return el.tipo === "Egresos"
    });
  
    const totalIng = (ingresosFiltrados.length >= 1 ? ingresosFiltrados.map(({ monto }) => monto).reduce((a, b) => a + b) : 0)
    const totalEgr = (egresosFiltrados.length >= 1 ? egresosFiltrados.map(({ monto }) => monto).reduce((a, b) => a + b) : 0);
  
    if (totalIng > 0) {
      valores.porcentajeGastos = ((totalEgr / totalIng) * 100).toFixed(2) + "%";
    } else {
      valores.porcentajeGastos = "0%";
    }
  
    ingresos.push(valores);
    obtenerIngresos();
    obtenerHeaderValores();
  
    ingresoDescripcion.value = "";
    ingresoMonto.value = "";}

}

function obtenerHeaderValores() {
  const totalIngresos = document.getElementById("total-ingresos");
  const totalEgresos = document.getElementById("total-egresos");

  let ingresosFiltrados = ingresos.filter((el) => {
    return el.tipo === "Ingresos"
  });

  let egresosFiltrados = ingresos.filter((el) => {
    return el.tipo === "Egresos"
  });

  const totalIng = (ingresosFiltrados.length >= 1 ? ingresosFiltrados.map(({ monto }) => monto).reduce((a, b) => a + b) : 0)
  const totalEgr = (egresosFiltrados.length >= 1 ? egresosFiltrados.map(({ monto }) => monto).reduce((a, b) => a + b) : 0);

  totalIngresos.innerHTML = "+" + totalIng;
  totalEgresos.innerHTML = "+" + totalEgr;

  obtenerPorcentajeGastos(totalIng, totalEgr);
};

obtenerHeaderValores();

function obtenerPorcentajeGastos(a, b) {
  const porcentajeGastos = document.getElementById("porcentaje-gastos");
  const restante = document.getElementById("restante");

  restante.innerHTML = `+${a - b}`;

if(a > 0){
  porcentajeGastos.innerHTML = `${((b * 100) / a).toFixed(2)}%`;

}else{
 porcentajeDeGastos = "0%";
}
};
