///////////////////////////// Mostrar matrices ////////////////////////////////////////////////////////
//Recoge los datos de la página web y los regresa en una matriz
const hacer_matriz = () => {
  let inputs = document.querySelector("#inputs");
  let arrInputs = inputs.getElementsByClassName("input");
  let arr = Array.from(arrInputs);
  let fila = [];
  let matriz = [];
  for (let i = 0; i < n; i++) {
    matriz[i] = [];
    for(let j = 0; j < (arrInputs.length / n); j++){
      matriz[i][j] = Number(arr[0].value);
      arr.shift();
    }
  }
  return procesarMatrizArribaAbajo(matriz);
};

const acomodarInputs = () => {
  let inputs = document.querySelector("#inputs");
  n = Number(document.querySelector(".form-control").value);
  for (let i = 0; i < n; i++) {
    let fila = "<div id=fila_";
    fila += fila + i + ">";
    for (let j = 0; j < n + 1; j++) {
      let input = "<input class='input'>";
      fila += input;
    }
    inputs.innerHTML += fila;
  }
};

const renderizarMatrizCalculada = (datos) => {
  let matrizResuleta = datos[0];
  let esConsistente = datos[1];
  let mathContainer = document.getElementById("resultado");
  let latexExpression = "\\begin{pmatrix}";
  matrizResuleta.forEach((fila) => {
    for (let i = 0; i <= fila.length; i++) {
      if (fila.length === i) {
        latexExpression += "\\\\";
      } else {
        latexExpression += fila[i] + "&";
      }
    }
  });
  latexExpression += "\\end{pmatrix}";
  mathContainer.innerHTML = latexExpression;
  MathJax.typeset();
};

/*
 * La matriz será en forma de un array multidimensional:
 * let matriz = [
 *   [1, 2, 3, 20]  -> Primer fila de números
 *   [4, 5, 3, 19]  -> Segunda fila de números
 *   [1, 2, 3, 18]  -> n fila de números
 * ]
 */
///////////////////////////// Calculadora de matrices ////////////////////////////////////////////////////////
const procesarMatrizArribaAbajo = (matriz) => {
  //Esta función se encarga de procesar la matriz y repetir operaciones
  //Dependiendo de la cantidad de filas
  for (let i = 0; i < matriz.length; i++) {
    let columna = conseguirColumna(matriz, i);
    let número_escalonado = matriz[i][i];
    if (número_escalonado === 1) {
      for (let j = i + 1; j < columna.length; j++) {
        let filaEscalonada = [];
        filaEscalonada = modificarFila(
          "multiplicar",
          columna[j] * -1,
          matriz[i]
        );
        console.log(matriz, columna[j]);
        matriz[j] = sumarFilas(filaEscalonada, matriz[j]);
      }
    } else if (número_escalonado === 0) {
      console.log("Sistema inconsitente");
      return [matriz, 0]; //El cero es par decir qu el amatriz es inconsisitente
    } else {
      matriz[i] = modificarFila("dividir", número_escalonado, matriz[i]);
      i--;
    }
  }

  return procesarMatrizAbajoArriba(matriz);
};

const procesarMatrizAbajoArriba = (matriz) => {
  for (let i = matriz.length - 1; i != -1; i--) {
    console.log(matriz);
    let x = i - 1;
    let columna = conseguirColumna(matriz, i);
    for (let j = x; 0 <= j; j--) {
      let filaEscalonada = [];
      let valor = columna[j];
      filaEscalonada = modificarFila("multiplicar", valor * -1, matriz[i]);
      matriz[j] = sumarFilas(filaEscalonada, matriz[j]);
    }
  }

  return renderizarMatrizCalculada([matriz, 1]); //1 es para decir que la matriz es consistente
};

const conseguirColumna = (matriz, número_columna) => {
  let columna = [];
  for (let i = 0; i < matriz.length; i++) {
    let fila = matriz[i];
    columna.push(fila[número_columna]);
  }
  return columna;
};

const modificarFila = (operación, número, fila) => {
  let filaModificada = fila.map((filaNúmero) => {
    switch (operación) {
      case "multiplicar":
        return filaNúmero * número;
        break;
      case "dividir":
        let númeroRedondeado = Number((filaNúmero / número).toFixed(3));
        return númeroRedondeado;
        break;
      default:
        console.log("Error al pasar la función");
        break;
    }
  });

  return filaModificada;
};

const sumarFilas = (primeraFila, segundaFila) => {
  let sumaDeFilas = [];
  for (let i = 0; i < primeraFila.length; i++)
    sumaDeFilas.push(primeraFila[i] + segundaFila[i]);

  return sumaDeFilas;
};

const test = () => {
  //Matriz de: https://www.superprof.es/apuntes/escolar/matematicas/algebralineal/sistemas/metodo-de-gauss.html
  let matriz_inicial = [
    //Sistema de 3x3 consistente
    [3, 2, 1, 1],
    [5, 3, 4, 2],
    [1, 1, -1, 1],
  ];
  matriz_inicial = [
    //Sistema de 4x4 consistente
    [1, 2, -3, -1, 0],
    [0, -3, 2, 6, -8],
    [-3, -1, 3, 1, 0],
    [2, 3, 2, -1, -8],
  ];
  /*matriz_inicial = [
    //Sistema de 3x3 inconsistente
    [1, 2, 3, 1],
    [-3, -2, -1, 2],
    [4, 4, 4, 3],
  ];*/
  let matrizFinal = procesarMatrizArribaAbajo(matriz_inicial);
  renderizarMatrizCalculada(matrizFinal);
};

window.onload = function () {
  let calcularBoton = document.querySelector("#calcular");
  calcularBoton.addEventListener("click", hacer_matriz);
  let seleccionarBoton = document.querySelector("#seleccionar");
  seleccionarBoton.addEventListener("click", acomodarInputs);
};
