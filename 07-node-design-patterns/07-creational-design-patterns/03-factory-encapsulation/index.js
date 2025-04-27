class Person {
  #name

  constructor(name) {
    this.#name = name
  }

  /**
   * @param {string} name
   */
  set name(name) {
    if (!name) {
      throw new Error('A person must have a name')
    }
    this.#name = name
  }

  get name() {
    return this.#name
  }
}

function createPerson(name) {
  return new Person(name)
}

const person = createPerson('James Joyce')

console.log(person.name, person)
