# Interface Segregation Principle

The Interface Segregation Principle (ISP) states that a client should not be forced to implement an interface that it doesn't use. This means that we should not have a single interface that contains methods that are not used by the client. Instead, we should have multiple interfaces, each containing methods that are used by the client.

## Violation of ISP

```ts
interface IOrder {
  processCashOrder(): void;
  processCreditOrder(): void;
  processOnlinePaymentOrder(): void;
}

class CashOrder implements IOrder {
  processCashOrder(): void {
    // process the cash order
  }
  processCreditOrder(): void {
    // ISP violation
    throw new Error("Method not implemented.");
  }
  processOnlinePaymentOrder(): void {
    // ISP violation
    throw new Error("Method not implemented.");
  }
}

class CreditOrder implements IOrder {
  processCashOrder(): void {
    // ISP violation
    throw new Error("Method not implemented.");
  }
  processCreditOrder(): void {
    // process the credit order
  }
  processOnlinePaymentOrder(): void {
    // ISP violation
    throw new Error("Method not implemented.");
  }
}
```

### Problems

- The client is _forced to implement_ methods that it doesn't use.
- _Code duplication_ in the implementation of the methods that are not used by the client.
- If we want to add new methods to the `IOrder` interface, we will have to _modify all the classes_ that implement the interface.

## Adherence to ISP

```ts
interface ICashOrder {
  processCashOrder(): void;
}

interface ICreditOrder {
  processCreditOrder(): void;
}

interface IOnlinePaymentOrder {
  processOnlinePaymentOrder(): void;
}

class CashOrder implements ICashOrder {
  processCashOrder(): void {
    // process the cash order
  }
}

...

```

### Advantages

- The client is _not forced to implement_ methods that it doesn't use.
- No _code duplication_ in the implementation of the methods that are not used by the client.
- If we want to add new methods to the `IOrder` interface, we will have to _modify only the classes that need to implement the new methods_.

## Conclusion

The Interface Segregation Principle is about _keeping the interfaces small and focused_. It is about _splitting the interfaces_ into smaller ones that are _specific to the needs of the clients_.
