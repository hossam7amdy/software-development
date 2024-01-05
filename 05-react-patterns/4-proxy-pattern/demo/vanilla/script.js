const root = document.getElementById("root");

const person = {
  name: "Saffa",
  age: 23,
  gender: "Female",
};

const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    if (!obj[prop]) {
      console.log(
        `Hmm.. this property doesn't seem to exist on the target object`
      );
    } else {
      console.log(`The value of ${prop} is ${Reflect.get(obj, prop)}`);
    }
  },
  set: (obj, prop, value) => {
    if (prop === "age" && typeof value !== "number") {
      console.log(`Sorry, you can only pass numeric values for age.`);
      return false;
    } else if (prop === "name" && value.length < 2) {
      console.log(`You need to provide a valid name.`);
      return false;
    } else {
      console.log(
        `Changed ${prop} from ${Reflect.get(obj, prop)} to ${value}.`
      );
      Reflect.set(obj, prop);
      return true;
    }
  },
});

personProxy.nonExistentProperty;
personProxy.age;

personProxy.name = "Hossam";
personProxy.age = 12;
