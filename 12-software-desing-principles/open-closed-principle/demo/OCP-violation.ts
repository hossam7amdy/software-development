class Employee {
  constructor(
    public id: number,
    public name: string,
    public basicSalary: number
  ) {}

  public calculateBonus(hours: number, type: string) {
    if (type === "manager") {
      return (this.basicSalary / 30 / 8) * hours * 2;
    }

    return (this.basicSalary / 30 / 8) * hours;
  }

  public toString() {
    return `Employee ID ${this.id}, Name ${this.name}`;
  }
}

const regularEmp = new Employee(1, "John", 900);
const managerEmp = new Employee(2, "Hossam", 900);

console.log(regularEmp.calculateBonus(20, "regular"));
console.log(regularEmp.toString());

console.log(managerEmp.calculateBonus(20, "manager"));
console.log(managerEmp.toString());
