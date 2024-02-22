# 3.3-a-simple-modification

Modify the function created in exercise 3.3 so that
it produces an error if the timestamp at the moment of a tick (including the
initial one that we added as part of exercise 3.3) is divisible by 5. Propagate
the error using both the callback and the event emitter. Hint: use Date.now()
to get the timestamp and the remainder (%) operator to check whether the
timestamp is divisible by 5.

## Run

To run the example launch:

```bash
node index.js
```
