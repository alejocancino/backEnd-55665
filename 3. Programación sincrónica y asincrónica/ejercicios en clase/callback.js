function calculadora(num1, num2, cb){
  console.log(cb(num1,num2));
}

const suma = (a,b) => {
  return a + b
}
const resta = (a,b) => {
  return a - b
}
const division = (a,b) => {
  return a / b
}
const multiplicacion = (a,b) => {
  return a * b
}
const modulo = (a,b) => {
  return a % b
}

calculadora(2,2, multiplicacion)