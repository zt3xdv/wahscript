const nombre = "WahScript";
let contador = 0;
function saludar(persona) {
  console.log("Hola, " + persona + "!");
  return "Saludos desde " + nombre;
}
function calcular(a, b = 10) {
  return a + b;
}
const duplicar = (x) => x * 2;
const sumar = (a, b) => {
  return a + b;
}
;
function verificarEdad(edad) {
  if (edad >= 18) {
    console.log("Eres mayor de edad - periodt!");
    return true;
  }
 else {
    console.log("Eres menor de edad - cap");
    return false;
  }
}
function contarHasta(n) {
  let i = 0;
  while (i < n) {
    console.log("Contando: " + i);
    i++;
  }
}
function fibonacci(n) {
  let resultado = [];
  for (let i = 0; i < n; i++) {
    if (i <= 1) {
      resultado[i] = i;
    }
 else {
      resultado[i] = resultado[i - 1] + resultado[i - 2];
    }
  }
  return resultado;
}
class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }
  presentarse() {
    console.log("Soy " + this.nombre + " y tengo " + this.edad + " años");
  }
  esMayorDeEdad() {
    return this.edad >= 18;
  }
}
class Estudiante extends Persona {
  constructor(nombre, edad, carrera) {
    super(nombre, edad);
    this.carrera = carrera;
  }
  estudiar() {
    console.log(this.nombre + " está estudiando " + this.carrera);
  }
}
async function obtenerDatos() {
  const datos = await fetch("https://api.example.com/data");
  return datos;
}
function operacionSegura() {
  try {
    const resultado = operacionRiesgosa();
    return resultado;
  }
 catch (error) {
    console.log("Ocurrió un error: " + error);
    return null;
  }
}
const frutas = ["manzana", "pera", "uva"];
const usuario = { nombre: "Juan", edad: 25, activo: true };
const mensaje = contador > 0 ? "Hay elementos" : "Está vacío";
const saludo = `Hola ${nombre}, bienvenido!`;
console.log("=== Demo de WahScript ===");
saludar("Mundo");
console.log("2 + 2 = " + calcular(2, 2));
console.log("Duplicar 5: " + duplicar(5));
verificarEdad(20);
console.log("Fibonacci de 10: " + fibonacci(10));
const juan = new Persona("Juan", 25);
juan.presentarse();
const maria = new Estudiante("María", 20, "Ingeniería");
maria.presentarse();
maria.estudiar();
console.log("=== Fin del Demo ===");
