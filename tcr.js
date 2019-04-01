'use strict'
////////////objeto de prueba a pequeña escala////////////
var object = [{

  "total": 45307,
  "age_max":13,
  "age_now":13,
  "market":5861.828267,
  "type":[1,9,3,4]
},
{
  "total": 45307,
  "age_max":13,
  "age_now":13,
  "market":5861.828267,
  "type":[4,2,7,4]
},
{
  "total": 45307,
  "age_max":13,
  "age_now":13,
  "market":5861.828267,
  "type":[7,3,3,1]
},
{
  "total": 45307,
  "age_max":13,
  "age_now":13,
  "market":5861.828267,
  "type":[1,5,3,9]
},
{
  "total": 45307,
  "age_max":13,
  "age_now":13,
  "market":5861.828267,
  "type":[1,2,6,4]
}];


////////////////////Recorrer toda la database buscando el type/////////////////////////
var objeto = [];

object.forEach(function(index){
  objeto.push(index.type);  
});
console.log(objeto);



///////////////////////////Regex para hacer la busqueda///////////////////////////////

function get_numbers(input) {
    return input.match(/[0-9]+/g);
}

var box = [];

var input_ingresado = prompt('ingrese maquinaria',0);//ingreso y filtrado de maquinaria
var tipo_maquinaria = get_numbers(input_ingresado);
box.push(tipo_maquinaria);

//////////////////////////////////////////////////////////////////////////////////////
var comp = [];

objeto.forEach(function(index){ 
    if(index == box.toString()){
      console.log(index);
      comp.push(index);
      console.log('coincide uno en la database');//coger el indice que coincide y pushearlo a comp
    }
});
 
console.log('este es item ingresado '+box);
console.log('este es el item que ha coincidido en la database  '+comp);


/////////////////////////////////////regresion lineal///////////////////////////////////

const regress = (x, y) => {
    const n = y.length;
    let sx = 0;
    let sy = 0;
    let sxy = 0;
    let sxx = 0;
    let syy = 0;
    for (let i = 0; i < n; i++) {
        sx += x[i];
        sy += y[i];
        sxy += x[i] * y[i];
        sxx += x[i] * x[i];
        syy += y[i] * y[i];
    }
    const mx = sx / n;
    const my = sy / n;
    const yy = n * syy - sy * sy;
    const xx = n * sxx - sx * sx;
    const xy = n * sxy - sx * sy;    const slope = xy / xx;
    const intercept = my - slope * mx;
    const r = xy / Math.sqrt(xx * yy);
    const r2 = Math.pow(r,2);
    let sst = 0;
    for (let i = 0; i < n; i++) {
       sst += Math.pow((y[i] - my), 2);
    }
    const sse = sst - r2 * sst;
    const see = Math.sqrt(sse / (n - 2));
    const ssr = sst - sse;

    console.log('Caida '+slope);
    console.log('Intercepcion '+intercept);
    console.log('R2 '+r2);

    return {slope, intercept, r2 };
}


var ax = box.toString();
var bx = comp.toString();
console.log(ax);
console.log(bx);

//regress([5,5,5,10], [5,5,5,5]);
var resultado = regress([4800,4200],[1,2]);   
console.log(resultado);
//aca hay que ingresar el precio del item ingresado y el precio de la database
//y haga recorrido de la AI haciendo las busquedas

