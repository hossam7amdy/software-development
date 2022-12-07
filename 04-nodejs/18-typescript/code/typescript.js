// function
var sum = function (a, b) {
    return a + b;
};
var answer = sum(3, 1);
// boolean
var isBool = true;
// number
var age = 28;
// string
var myAge = "I am ".concat(age, " old.");
// array
var arr = ["hossam", "ahmed"];
var arr2 = [1, 2, 3];
// object
var cat = {
    name: "mesh-mesh",
    age: 6
};
// undefined & null
var meh = undefined;
var noo = null;
// Tuple: order matter
var basket;
basket = ["apple", 5];
// Enum
var size;
(function (size) {
    size[size["Small"] = 1] = "Small";
    size[size["Medium"] = 2] = "Medium";
    size[size["Large"] = 3] = "Large";
})(size || (size = {}));
var sizeName = size[2];
var sizeNumber = size.Large;
// Any - !!!!!!!!!!!!! BE CAREFULL
var whatever = "aghhhhhhhhhhhh nooooooooooooooo!!!";
whatever = 5;
// void
var sing = function () {
    console.log("tadaaa");
};
// never
var error = function () {
    throw Error("ooops");
};
var fightRobotArmy = function (robot) {
    console.log(robot);
};
var fightRobotArmy2 = function (robot) {
    console.log(robot);
};
var dog = {};
console.log(dog.count);
// functions
var fightRobotArmy3 = function (robot) {
    console.log("Let's fight");
};
var fightRobotArmy4 = function (robot) {
    console.log(robot);
    return 5;
};
// classes
var Animal = /** @class */ (function () {
    function Animal(sing) {
        this.sing = "tadaaaa";
        this.sing = sing;
    }
    Animal.prototype.greet = function () {
        return "Hello ".concat(sing);
    };
    return Animal;
}());
var lion = new Animal("Roaaar");
lion.greet();
// union
var confused;
confused = "hossam";
confused = true;
confused = 5;
