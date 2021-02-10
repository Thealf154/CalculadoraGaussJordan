//Recoge los datos de la página web y los regresa en una matriz
const hacer_matriz = () => {
  let matriz = [];
  return matriz;
};

/*
 * La matriz será en forma de un array multidimensional:
 * let matriz = [
 *   [1, 2, 3, 20]  -> Primer fila de números
 *   [4, 5, 3, 19]  -> Segunda fila de números
 *   [1, 2, 3, 18]  -> n fila de números
 * ]
 */

const procesarMatrizArribaAbajo = (matriz) => {
  //Esta función se encarga de procesar la matriz y repetir operaciones
  //Dependiendo de la cantidad de filas
  for (let i = 0; i < matriz.length; i++) {
    let columna = conseguirColumna(matriz, i);
    let número_escalonado = matriz[i][i];
    console.log(matriz);
    if (número_escalonado === 1) {
      for (let j = i + 1; j < columna.length; j++) {
        let filaEscalonada = [];
        if (columna[j] > 0)
          filaEscalonada = modificarFila("multiplicar", columna[j] * -1, matriz[i]);
        else 
          filaEscalonada = modificarFila("multiplicar", columna[j], matriz[i]);
        
        matriz[j] = sumarFilas(filaEscalonada, matriz[j]);
      }
    } else {
      matriz[i] = modificarFila("dividir", número_escalonado, matriz[i]);
      i--;
    }
  }

  return matriz;
};

const procesarMatrizAbajoArriba = (matriz) => {};

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
        let númeroRedondeado = Number((filaNúmero / número).toFixed(2));
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

const registrarPasos = () => {};

const test = () => {
  //Matriz de: https://www.superprof.es/apuntes/escolar/matematicas/algebralineal/sistemas/metodo-de-gauss.html
  let matriz_inicial = [
    [3, 2, 1, 1],
    [5, 3, 4, 2],
    [1, 1, -1, 1],
  ];
  let matriz_final = procesarMatrizArribaAbajo(matriz_inicial);
};

window.onload = function () {
  test();
};
