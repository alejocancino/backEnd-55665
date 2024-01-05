const sumar = (a, b) => {
  return new Promise((resolve, reject) => {
    if (a <= 0 && b <= 0) {
      reject("No se puede realizar esta operacion");
    } else {
      resolve(a+b)
    }
  });
};


sumar(4,4).then((response)=>{
  console.log(response);
}).catch((error)=>{
  console.error(error)
})