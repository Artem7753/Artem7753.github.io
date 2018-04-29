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


function f() {
  console.log( "привет" );
}

Function.prototype.defer = function(time){
	setTimeout(this,time);
}

f.defer(1000); // выведет "привет" через 1 секунду

function f(a, b) {
  console.log( a + b );
}

Function.prototype.defer = function(time){
	var f = this;
	return function(){
	    var args = arguments, context = this;
		setTimeout(function(){
			f.apply(context, args)
		})
	}
}

f.defer(1000)(1, 2); // выведет 3 через 1 секунду.


function CoffeeMachine(power) {
  // свойства конкретной кофеварки
  this._power = power;
  this._waterAmount = 0;
}

// свойства и методы для всех объектов класса
CoffeeMachine.prototype.WATER_HEAT_CAPACITY = 4200;

CoffeeMachine.prototype._getTimeToBoil = function() {
  return this._waterAmount * this.WATER_HEAT_CAPACITY * 80 / this._power;
};

CoffeeMachine.prototype.run = function() {
  setTimeout(function() {
    console.log( 'Кофе готов!' );
  }, this._getTimeToBoil());
};

CoffeeMachine.prototype.setWaterAmount = function(amount) {
  this._waterAmount = amount;
};

var coffeeMachine = new CoffeeMachine(10000);
coffeeMachine.setWaterAmount(50);
coffeeMachine.run();

function Hamster() {
	this.food = [];
}

Hamster.prototype.found = function(something) {
  this.food.push(something);
};

// Создаём двух хомяков и кормим первого
var speedy = new Hamster();
var lazy = new Hamster();

speedy.found("яблоко");
speedy.found("орех");

console.log( speedy.food.length ); // 2
console.log( lazy.food.length ); // 2 (!??)


function Animal(name) {
  this.name = name;
}

Animal.prototype.walk = function() {
  alert( "ходит " + this.name );
};

function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype = Object.create(Animal.prototype);
Rabbit.prototype.constructor = Rabbit;

Rabbit.prototype.walk = function() {
  alert( "прыгает! и ходит: " + this.name );}

function Animal(name) {
  this.name = name;



}

  Animal.prototype.walk = function() {
    alert( "ходит " + this.name );
  };

function Rabbit(name) {
  Animal.apply(this, arguments);
}
Rabbit.prototype = Object.create(Animal.prototype);

Rabbit.prototype.walk = function() {
  console.log( "прыгает " + this.name );
};

var rabbit = new Rabbit("Кроль");
rabbit.walk();


function Clock(options) {
  this._template = options.template;
}

Clock.prototype._render = function() {
  var date = new Date();

  var hours = date.getHours();
  if (hours < 10) hours = '0' + hours;

  var min = date.getMinutes();
  if (min < 10) min = '0' + min;

  var sec = date.getSeconds();
  if (sec < 10) sec = '0' + sec;

  var output = this._template.replace('h', hours).replace('m', min).replace('s', sec);

  console.log(output);
};

Clock.prototype.stop = function() {
  clearInterval(this._timer);
};

Clock.prototype.start = function() {
  this._render();
  var self = this;
  this._timer = setInterval(function() {
    self._render();
  }, 1000);
};


function ExtendedClock(options) {
  Clock.apply(this, arguments);
  this._precision = +options.precision || 1000;
}

ExtendedClock.prototype = Object.create(Clock.prototype);

ExtendedClock.prototype.start = function() {
  this._render();
  var self = this;
  this._timer = setInterval(function() {
    self._render();
  }, this._precision);
};

var clock = new ExtendedClock({
      template: 'h:m:s',
	  precision: 500
    });
    clock.start();


function Animal() {}

function Rabbit() {}
Rabbit.prototype = Object.create(Animal.prototype);

var rabbit = new Rabbit();

console.log( rabbit.constructor == Rabbit ); // false

function A() {}

function B() {}

A.prototype = B.prototype = {};

var a = new A();

console.log( a instanceof B ); // прототипы ссылаются на один объект


function Animal() {}

function Rabbit() {}
Rabbit.prototype = Object.create(Animal.prototype);

var rabbit = new Rabbit();

console.log( rabbit instanceof Rabbit ); // true
console.log( rabbit instanceof Animal ); // true
console.log( rabbit instanceof Object ); // true




























