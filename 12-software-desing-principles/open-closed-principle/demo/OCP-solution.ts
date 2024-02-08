interface IEmployee {
  calculateBonus(hours: number): number;
}

class RegularEmployee implements IEmployee {
  constructor(
    public id: number,
    public name: string,
    public basicSalary: number
  ) {}

  public calculateBonus(hours: number) {
    return (this.basicSalary / 30 / 8) * hours;
  }

  public toString() {
    return `Employee ID ${this.id}, Name ${this.name}`;
  }
}

class ManagerEmployee implements IEmployee {
  constructor(
    public id: number,
    public name: string,
    public basicSalary: number
  ) {}

  public calculateBonus(hours: number) {
    return (this.basicSalary / 30 / 8) * hours * 2;
  }

  public toString() {
    return `Employee ID ${this.id}, Name ${this.name}`;
  }
}

const regular = new RegularEmployee(1, "John", 900);
const manager = new ManagerEmployee(2, "Hossam", 900);

console.log(regular.calculateBonus(20));
console.log(regular.toString());

console.log(manager.calculateBonus(20));
console.log(manager.toString());
