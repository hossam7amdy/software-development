'use strict';

///////////////////////////////////////
/** ///// 1) Constructor Functions and the new Operator
 
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

const hossam = new Person('Hossam', 1995);
const ahmed = new Person('Ahmed', 1997);

console.log(hossam, ahmed);
console.log(hossam instanceof Person); // true

const emad = 'Emad';
console.log(emad instanceof Person); // false

///// What will happened when an instance is created ?
/**
 * 1. New {} is created
 * 2. Function is called, this => {}
 * 3. {} linked to prototype
 * 4. Function automatically return {}
 */

///////////////////////////////////////
/** ///// 2) Prototypes

Person.prototype.calcAge = function () {
  return 2037 - this.birthYear;
};

console.log(Person.prototype);

console.log(hossam.calcAge());
console.log(ahmed.calcAge());

console.log(hossam.__proto__);

console.log(hossam.__proto__ === Person.prototype); // true
console.log(Person.prototype.isPrototypeOf(hossam)); // true
console.log(Person.prototype.isPrototypeOf(ahmed)); // true

console.log(Person.prototype.isPrototypeOf(Person)); // false
// better named as => .prototypeOfLinkedObjects

Person.prototype.species = 'Homo Sapients';
console.log(hossam.hasOwnProperty('firstName')); // true
console.log(hossam.hasOwnProperty('species')); // false

console.log(hossam.__proto__); // Person
console.log(hossam.__proto__.__proto__); // Object (top of the chain)
console.log(hossam.__proto__.__proto__.__proto__); // null

console.dir(Person.prototype.constructor);
*/

///////////////////////////////////////
/** ///// Prototypal Inheritance on Built-In Objects
 console.log(jonas.__proto__);
 // Object.prototype (top of prototype chain)
console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);

const arr = [3, 6, 6, 5, 6, 9, 9]; // new Array === []
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

console.log(arr.__proto__.__proto__);

Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(x => x + 1);
*/

///////////////////////////////////////
/** ///// Coding Challenge #1
Your tasks:
1. Use a constructor function to implement a 'Car'. A car has a 'make' and a 
  'speed' property. The 'speed' property is the current speed of the car in km/h
2. Implement an 'accelerate' method that will increase the car's speed by 10, 
  and log the new speed to the console
3. Implement a 'brake' method that will decrease the car's speed by 5, and log 
  the new speed to the console
4. Create 2 'Car' objects and experiment with calling 'accelerate' and 
  'brake' multiple times on each of them
Test data:
§ Data car 1: 'BMW' going at 120 km/h
§ Data car 2: 'Mercedes' going at 95 km/h


// 1.
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

// 2.
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`This ${this.make} is going at ${this.speed}km/h`);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`This ${this.make} is going at ${this.speed}km/h`);
};

// 3.
const BMW = new Car('Toyota', 120);
const Mercedes = new Car('Toyota', 95);

console.log(BMW.speed); // 120
console.log(Mercedes.speed); // 95

BMW.accelerate();
Mercedes.accelerate();

BMW.brake();
Mercedes.brake();
*/

///////////////////////////////////////
/** ///// ES6 Classes
 * 1. Classes are NOT hoisted
 * 2. Classes are first-class citizens
 * 3. Classes are executed in strict mode
 

// Class expression
// const Person = class {};

// Class declaration
class PersonCL {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Sets a property that already exists
  set fullName(name) {
    if (name.includes(' ')) {
      this._fullName = name;
    } else {
      alert(`${name} is not a full name.`);
    }
  }

  get fullName() {
    return this._fullName;
  }
  
  calcAge = function () {
    console.log(`${this.fullName} is ${2025 - this.birthYear} years now.`);
  };

  static hey() {
    console.log('Hey there');
  }
}

const hossam = new PersonCL('Hossam Hamdy', 1995);
hossam.calcAge();
PersonCL.hey();
console.log(hossam.__proto__ === Person.prototype);

const PersonProto = {
  calcAge() {
    console.log(`${this.firstName} is ${2025 - this.birthYear} years now.`);
  },

  Init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const ahmed = Object.create(PersonProto);
console.log(PersonProto === ahmed.__proto__);
ahmed.Init('Ahmed', 1997);
ahmed.calcAge();
*/

///////////////////////////////////////
/** ///// Coding Challenge #2
Your tasks:
1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide 
  by 1.6)
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but 
  converts it to km/h before storing the value, by multiplying the input by 1.6)
4. Create a new car and experiment with the 'accelerate' and 'brake'
  methods, and with the getter and setter.
Test data:
§ Data car 1: 'Ford' going at 120 km/h


class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`This ${this.make} is going at ${this.speed}km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`This ${this.make} is going at ${this.speed}km/h`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new CarCl('Ford', 120);
console.log(ford.speedUS);
ford.accelerate();
ford.accelerate();
ford.brake();
console.log(ford.speedUS);

ford.speedUS = 50;
console.log(ford);
console.log(ford.speedUS);
*/

///////////////////////////////////////
/** ///// Inheritance Between "Classes": Constructor Function
 
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};
Person.prototype.calcAge = function () {
  console.log(`${this.firstName} is ${2024 - this.birthYear} years old`);
};

const Student = function (firstName, birthYear, study) {
  Person.call(this, firstName, birthYear);
  this.study = study;
};
// Linking Prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(
    `Hey! My name is ${this.firstName} and I am a ${this.study} student`
    );
  };
  
  const hossam = new Student('Hossam', 1995, 'Computer Science');
  
  console.log(hossam);
  hossam.introduce();
  hossam.calcAge();
  
console.log(hossam.__proto__); // introduce
console.log(hossam.__proto__.__proto__); // calcAge

console.log(hossam instanceof Student);
console.log(hossam instanceof Person);
console.log(hossam instanceof Object);

console.dir(Student.prototype.constructor); // Wrong

Student.prototype.constructor = Student;

console.dir(Student.prototype.constructor); // Right

// console.dir(Person.prototype.constructor);
*/

///////////////////////////////////////
/** //// Coding Challenge #3
Your tasks:
1. Use a constructor function to implement an Electric Car (called 'EV') as a child
  "class" of 'Car'. Besides a make and current speed, the 'EV' also has the 
  current battery charge in % ('charge' property)
2. Implement a 'chargeBattery' method which takes an argument 
  'chargeTo' and sets the battery charge to 'chargeTo'
3. Implement an 'accelerate' method that will increase the car's speed by 20, 
  and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 
  km/h, with a charge of 22%'
4. Create an electric car object and experiment with calling 'accelerate', 
  'brake' and 'chargeBattery' (charge to 90%). Notice what happens when 
  you 'accelerate'! Hint: Review the definiton of polymorphism �
Test data:
§ Data car 1: 'Tesla' going at 120 km/h, with a charge of 23%
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`This ${this.make} is going at ${this.speed}km/h`);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`This ${this.make} is going at ${this.speed}km/h`);
};
// 1.
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};
// Link the Prototypes
EV.prototype = Object.create(Car.prototype);
EV.prototype.constructor = EV;
// 2.
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
  if (this.charge > 100) this.charge = 100;
  console.log(
    `Your battery is ${this.charge === 100 ? 'Fully' : this.charge} charged`
    );
  };
// 3.
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
    );
  };
  // 4.
  const tesla = new EV('Tesla', 120, 23);
console.log(tesla);
tesla.accelerate();
tesla.brake();
tesla.accelerate();
tesla.chargeBattery(90);
*/

//////////////////////////////////////
/** ///// Inheritance Between "Classes": ES6 Classes
 
 class PersonCL {
   constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  
  // Instance methods
  calcAge() {
    console.log(`${this.fullName} is ${2025 - this.birthYear} years now.`);
  }
  
  // Sets a property that already exists
  set fullName(name) {
    if (name.includes(' ')) {
      this._fullName = name;
    } else {
      alert(`${name} is not a full name.`);
    }
  }

  get fullName() {
    return this._fullName;
  }
  
  static hey() {
    console.log('Hey there');
  }
}

class StudentCL extends PersonCL {
  constructor(firstName, birthYear, course) {
    // Always needs to happen first!
    super(firstName, birthYear);
    this.course = course;
  }
  
  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }
  
  calcAge() {
    console.log(
      `I'm ${
        2025 - this.birthYear
      } years old, but as a student I feel more like ${
        2025 - this.birthYear + 10
      }`
      );
    }
}

const hossam = new StudentCL('Hossam Hamdy', 1995, 'Computer Science');
hossam.introduce();
hossam.calcAge();
*/

//////////////////////////////////////
/** ///// Inheritance Between "Classes": Object.create
 
const PersonProto = {
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },

  calcAge() {
    console.log(
      `My name is ${this.firstName} and I'm ${2025 - this.birthYear} years old`
    );
  },
};

const hossam = Object.create(PersonProto);
hossam.init('Hossam', 1995);
hossam.calcAge();

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};
StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const ahmed = Object.create(StudentProto);
ahmed.init('Ahmed', 1997, 'Dentist');
ahmed.introduce();
ahmed.calcAge();

// hossam.introduce(); Error: not in my Prototype chain
*/

///////////////////////////////////////
/** // Encapsulation: Protected Properties and Methods
 *  // Encapsulation: Private Class Fields and Methods
 *
 * 1) Public fields
 * 2) Private fields
 * 3) Public methods
 * 4) Private methods
 * (there is also the static version)
 *
 
 class Account {
   // 1) Public fields
   locale = navigator.language;
   
   // 2) Private fields
   #pin;
   #movements = [];

   constructor(owner, currency, pin) {
     this.owner = owner;
     this.currency = currency;
     this.#pin = pin;
     
     console.log(`Thank you for openning an account ${owner}`);
    }
    
    // 3) Public methods
    deposit(val) {
      this.#movements.push(val);
      return this;
    }
    
    withdraw(val) {
      this.deposit(-val);
      return this;
    }
    
    requestLoan(val) {
      if (this.#approvedLoan(val)) {
        this.deposit(val);
        console.log('Loan Approved');
        return this;
      }
    }
    
    getMovements() {
    return this.#movements;
  }
  
  // 4) Private methods
  #approvedLoan(val) {
    return true;
  }
  
  // static method
  static helper() {
    console.log("I am a help, don't eat the help");
  }
}

const acc1 = new Account('Hossam', 'EGP', 1111);

// public interface
acc1.deposit(250);
acc1.withdraw(100);
acc1.requestLoan(1000);

//// shouldn't be called from outside
// acc1.#movements.push(250);
// acc1.#movements.push(-100);
// acc1.#approvedLoan(1000);
// console.log(acc1.#pin);

console.log(acc1);
Account.helper();

// Support chaining
acc1.deposit(300).withdraw(65).deposit(750).requestLoan(1000);
console.log(acc1.getMovements());
*/

/** ///// Coding Challenge #4
Your tasks:
1. Re-create Challenge #3, but this time using ES6 classes: create an 'EVCl'
  child class of the 'CarCl' class
2. Make the 'charge' property private
3. Implement the ability to chain the 'accelerate' and 'chargeBattery'
  methods of this class, and also update the 'brake' method in the 'CarCl'
  class. Then experiment with chaining!
Test data:
§ Data car 1: 'Rivian' going at 120 km/h, with a charge of 23%

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  
  accelerate() {
    this.speed += 10;
    console.log(`This ${this.make} is going at ${this.speed}km/h`);
    // return this;
  }
  
  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed}km/h`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }
  
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCL extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }
  
  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
      );
      return this;
    }
    
    chargeBattery(charge) {
      this.#charge += charge;
      return this;
    }
  }
  
  const rivian = new EVCL('Rivian', 120, 23);
console.log(rivian);

rivian.accelerate().accelerate().brake().chargeBattery(10).accelerate();
*/
