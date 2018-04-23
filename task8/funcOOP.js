function CoffeeMachine(power) {
  this.waterAmount = 0;
  var _timeout;
  var WATER_HEAT_CAPACITY = 4200;

  var self = this;

  function getBoilTime() {
    return self.waterAmount * WATER_HEAT_CAPACITY * 80 / power;
  }

  function onReady() {
    alert( 'Кофе готово!' );
  }

  this.run = function() {
    _timeout = setTimeout(onReady, getBoilTime());
  };
  this.stop = function(){
	  clearTimeout(_timeout);
  }

}

var coffeeMachine = new CoffeeMachine(50000);
coffeeMachine.waterAmount = 200;

coffeeMachine.run();
coffeeMachine.stop(); // кофе приготовлен не будет


function User() {
	var firstName = "";
	var surname = "";

	this.setFirstName = function(value){
		firstName = value;
	}
	this.setSurname = function(value){
		surname = value;
	}
	this.getFullName = function(){
		return firstName + " " + surname;
	}
}

var user = new User();
user.setFirstName("Петя");
user.setSurname("Иванов");

console.log(user.getFullName() ); // Петя Иванов


function CoffeeMachine1(power, capacity) {
  this.getPower = function(){
	  return power;
  }
  this.setWaterAmount = function(amount) {
    if (amount < 0) {
      throw new Error("Значение должно быть положительным");
    }
    if (amount > capacity) {
      throw new Error("Нельзя залить воды больше, чем " + capacity);
    }

    waterAmount = amount;
  };

  this.getWaterAmount = function() {
    return waterAmount;
  };

}


function CoffeeMachine3(power, capacity) {
  var waterAmount = 0;

  var WATER_HEAT_CAPACITY = 4200;

  function getTimeToBoil() {
    return waterAmount * WATER_HEAT_CAPACITY * 80 / power;
  }

  this.setWaterAmount = function(amount) {
    if (amount < 0) {
      throw new Error("Значение должно быть положительным");
    }
    if (amount > capacity) {
      throw new Error("Нельзя залить больше, чем " + capacity);
    }

    waterAmount = amount;
  };

  this.addWater = function(amount) {
    this.setWaterAmount(waterAmount + amount);
  };

  function onReady() {
    alert( 'Кофе готов!' );
  }

  this.setOnReady = function(newOnReady) {
    onReady = newOnReady;
  };

  this.run = function() {
    setTimeout(onReady, getTimeToBoil());
  };

  this.getWaterAmount = function(amount) {
    return waterAmount;
  };
}

var coffeeMachine = new CoffeeMachine3(100000, 400);
coffeeMachine.addWater(200);
coffeeMachine.addWater(100);
//coffeeMachine.addWater(300); // Нельзя залить больше..
coffeeMachine.setOnReady(function() {
  var amount = coffeeMachine.getWaterAmount();
  console.log( 'Готов кофе: ' + amount + 'мл' ); // Готов кофе: 150 мл
});
coffeeMachine.run();





function CoffeeMachine4(power, capacity) {
  var waterAmount = 0;

  var timerId;

  this.isRunning = function() {
    return !!timerId;
  };

  var WATER_HEAT_CAPACITY = 4200;

  function getTimeToBoil() {
    return waterAmount * WATER_HEAT_CAPACITY * 80 / power;
  }

  this.setWaterAmount = function(amount) {
    // ... проверки пропущены для краткости
    waterAmount = amount;
  };

  this.getWaterAmount = function(amount) {
    return waterAmount;
  };

  function onReady() {
    console.log( 'Кофе готов!' );
  }

  this.setOnReady = function(newOnReady) {
    onReady = newOnReady;
  };

  this.run = function() {
    timerId = setTimeout(function() {
		timerId = null;
      onReady();

    }, getTimeToBoil());
  };

}

var coffeeMachine = new CoffeeMachine4(20000, 500);
coffeeMachine.setWaterAmount(100);

console.log( 'До: ' + coffeeMachine.isRunning() ); // До: false

coffeeMachine.run();
console.log( 'В процессе: ' + coffeeMachine.isRunning() ); // В процессе: true

coffeeMachine.setOnReady(function() {
  console.log( "После: " + coffeeMachine.isRunning() ); // После: false
});
