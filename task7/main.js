var arr = ["a", "b"];

arr.push(function() {
  console.log(this);
})

arr[2]();

var obj = {
  go: function() {console.log(this) }
}; // необходима ;
obj.go();

var method;


obj.go();            // (1) object

(obj.go)();          // (2) object , скобки ни на что не влияют

(method = obj.go)();      // (3) сначала присваевается, потом вызывается

(obj.go || obj.stop)(); // (4) если существует, вызывается

var user = {
  firstName: "Василий",

  export: this
};

console.log( user.export.firstName ); // undefined, так как указывает не на объект

var name = "";

var user = {
  name: "Василий",

  export: function() {
    return this;
  }

};

console.log( user.export().name );

var user1 = {
  name: "Василий",

  export: function() {
    return {
      value: this
    };
  }

};

console.log( user1.export().value.name ); // так как в поле присвается текущий объект

var calculator = {
	read: function(){
		this.a = +prompt("first num");
		this.b = +prompt("second num");
	},
	sum: function(){
	return this.a + this.b;
	},
	mul: function(){
		return this.a * this.b;
	}
}
//console.log(calculator.read());
//console.log(calculator.sum());
//console.log(calculator.mul());


var ladder = {
  step: 0,
  up: function() { // вверх по лестнице
    this.step++;
	return this
  },
  down: function() { // вниз по лестнице
    this.step--;
	return this
  },
  showStep: function() { // вывести текущую ступеньку
    console.log( this.step );
  }
};
ladder.up().up().down().up().down().showStep(); // 1





