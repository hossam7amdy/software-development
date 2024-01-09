// function
const sum = (a: number, b: number) => {
  return a + b;
};
const answer = sum(3, 1);

// boolean
const isBool: Boolean = true;

// number
const age: number = 28;

// string
const myAge = `I am ${age} old.`;

// array
const arr: Array<string> = ["hossam", "ahmed"];
const arr2: number[] = [1, 2, 3];

// object
const cat: object = {
  name: "mesh-mesh",
  age: 6,
};

// undefined & null
let meh: undefined = undefined;
let noo: null = null;

// Tuple: order matter
let basket: [string, number];
basket = ["apple", 5];

// Enum
enum size {
  Small = 1,
  Medium = 2,
  Large = 3,
}

let sizeName: string = size[2];
let sizeNumber: number = size.Large;

// Any - !!!!!!!!!!!!! BE CAREFULL
let whatever: any = "aghhhhhhhhhhhh nooooooooooooooo!!!";
whatever = 5;

// void
let sing = (): void => {
  console.log("tadaaa");
};

// never
let error = (): never => {
  throw Error("ooops");
};

// interface
interface RobotArmy {
  count: number;
  type: string;
  magic: string;
}

let fightRobotArmy = (robot: RobotArmy) => {
  console.log(robot);
};
let fightRobotArmy2 = (robot: {
  count: number;
  type: string;
  magic: string;
}) => {
  console.log(robot);
};

// Type Assertion
interface CatArmy {
  count: number;
  type: string;
  magic?: string;
}

let dog = {} as CatArmy;
console.log(dog.count);

// functions
let fightRobotArmy3 = (robot: RobotArmy): void => {
  console.log("Let's fight");
};

let fightRobotArmy4 = (robot: RobotArmy): number => {
  console.log(robot);
  return 5;
};

// classes
class Animal {
  private sing: string = "tadaaaa";

  constructor(sing: string) {
    this.sing = sing;
  }

  greet(): string {
    return `Hello ${sing}`;
  }
}

let lion = new Animal("Roaaar");
lion.greet();

// union
let confused: number | string | boolean;
confused = "hossam";
confused = true;
confused = 5;

// infer the type emplicitly
let number = 5;
// number = "hossam"; // Error: expect a number
