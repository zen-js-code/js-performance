function fibonacci(num){
  var a = 1, b = 0, temp;

  while (num >= 0){
    temp = a;
    a = a + b;
    b = temp;
    --num;
  }

  return b;
}

let sum = 0;
for (let i = 0; i < 200; ++i) {
  sum += fibonacci(i);
}

console.log(sum);
