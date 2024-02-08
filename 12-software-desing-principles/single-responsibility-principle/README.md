# Single Responsibility Principle (SRP)

The Single Responsibility Principle (SRP) states that a class should have only one reason to change. This means that a class should have only one job.

The SRP can be applied to classes, functions, and modules. By following this principle, you can create code that is easier to understand, maintain, and extend.

## Example

### Classes

When designing classes, you should aim to give each class a single responsibility.

Consider the following example:

```ts
class OrderService {
  placeOrder() {
    // create order
    ...

    sendConfirmationEmail();

    updateInventory();
  }

  sendConfirmationEmail() {
    // send confirmation email
  }

  updateInventory() {
    // update inventory
  }
}
```

In this example, the `OrderService` class has multiple responsibilities. It is responsible for creating orders, sending confirmation emails, and updating inventory. This violates the SRP, as the class has more than one reason to change.

To follow the SRP, we can refactor the `OrderService` class into multiple classes, each with a single responsibility:

```ts
class OrderService {
  placeOrder() {
    // create order
    ...

    EmailService.sendConfirmationEmail();
    InventoryService.updateInventory();
  }
}

class EmailService {
  sendConfirmationEmail() {
    // send confirmation email
  }
}

class InventoryService {
  updateInventory() {
    // update inventory
  }
}
```

### Functions

When designing functions, you should aim to give each function a single responsibility.

Consider the following example:

```ts
function placeOrder(order: Order) {
  // create order
  // send confirmation email
  // update inventory
}
```

In this example, the `placeOrder` function has multiple responsibilities. It is responsible for creating orders, sending confirmation emails, and updating inventory. This violates the SRP, as the function has more than one reason to change.

To follow the SRP, we can refactor the `placeOrder` function into multiple functions, each with a single responsibility:

```ts
function createOrder(order: Order) {
  // create order
}

function sendConfirmationEmail(order: Order) {
  // send confirmation email
}

function updateInventory(order: Order) {
  // update inventory
}
```

### Modules

When designing modules, you should aim to give each module a single responsibility.

Consider the following example:

```ts
module OrderModule {
  export function placeOrder(order: Order) {
    // create order
    // send confirmation email
    // update inventory
  }
}
```

In this example, the `OrderModule` module has multiple responsibilities. It is responsible for creating orders, sending confirmation emails, and updating inventory. This violates the SRP, as the module has more than one reason to change.

To follow the SRP, we can refactor the `OrderModule` module into multiple modules, each with a single responsibility:

```ts
module OrderModule {
  export function placeOrder(order: Order) {
    OrderService.createOrder(order);
    EmailService.sendConfirmationEmail(order);
    InventoryService.updateInventory(order);
  }
}

module OrderService {
  export function createOrder(order: Order) {
    // create order
  }
}

module EmailService {
  export function sendConfirmationEmail(order: Order) {
    // send confirmation email
  }
}

module InventoryService {
  export function updateInventory(order: Order) {
    // update inventory
  }
}
```

## Conclusion

The Single Responsibility Principle (SRP) is a fundamental principle of object-oriented design. By following this principle, you can create code that is easier to understand, maintain, and extend.
