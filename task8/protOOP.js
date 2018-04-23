var animal = {
  jumps: null
};
var rabbit = {
  jumps: true
};

rabbit.__proto__ = animal;

console.log( rabbit.jumps ); // true

delete rabbit.jumps;

console.log( rabbit.jumps ); // null

delete animal.jumps;

console.log( rabbit.jumps ); //undefined


var head = {
  glasses: 1
};

var table = {
  pen: 3
};

var bed = {
  sheet: 1,
  pillow: 2
};

var pockets = {
  money: 2000
};
pockets.__proto__ = bed;
bed.__proto__ = table;
table.__proto__ = head;

console.log(pockets.pen ); // 3
console.log( bed.glasses ); // 1
console.log( table.money ); // undefined
