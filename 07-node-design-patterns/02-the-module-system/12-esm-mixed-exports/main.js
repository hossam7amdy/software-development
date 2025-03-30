import mylog, { info } from "./logger.js";
import { count, increment } from "./test.js";

mylog("Hello");
info("World");

console.log(count);
increment();
console.log(count);
