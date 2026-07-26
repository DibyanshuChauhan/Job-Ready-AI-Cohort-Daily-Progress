"use strict";
/**
 * string, number, boolean, array, tuple, void, object, never, type, any, unknown
 */
/**
 * Array = fixed size but not the length
 * tuple = fixed size and length and type of each element
 */
const arr = [1, 2, 3, 4, 5];
console.log(arr);
const tuple = [1, "Hello", true];
console.log(tuple[0]);
console.log(tuple[1].toUpperCase());
console.log(tuple[2]);
const greet = (name) => {
    console.log(`Hello ${name}`);
};
greet("John Doe");
const greet1 = () => {
    throw new Error("This function never returns");
};
const user = {
    name: "Divyanshu",
    age: 26,
    isMale: true
};
const greetUser = (data) => {
    console.log(`Hello ${data.name}, you are ${data.age} years old and you are ${data.isMale ? "male" : "female"}`);
};
greetUser(user);
let a = 123;
console.log(a.toUpperCase()); // This will not throw an error at compile time, but will throw an error at runtime
let b = "Hello World!...";
if (typeof b === "string") {
    console.log(b.toUpperCase()); // This will not throw an error at compile time or runtime
}
