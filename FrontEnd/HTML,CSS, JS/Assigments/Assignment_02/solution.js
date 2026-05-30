// LEVEL 01
// Question Number 1...
function sayHello() {
    console.log("Hello Javascript")
}
sayHello()

// Question Number 2...
function add(a, b) {
    console.log(a + b)
}
add(5, 7)

// Question Number 3...
function greetings(name = "guest") {
    console.log(`Hi ${name}`)
}
greetings()

// Question Number 4...
function addUnLimited(...nums) {
    let sum = 0
    nums.forEach(function (val) {
        sum = sum + val
    })
    console.log(`Total sum of values are ${sum}`)
}
addUnLimited(1, 2, 3, 4, 5, 6, 7, 8, 9)

    // Question Number 5...
    (function () {
        console.log("I run Instantly")
    })()

// Question Number 6...
function parent() {
    let a = 12
    function child() {
        console.log(a)
    }
    child()
}
parent()

// Question Number 7...
let fruits = ["Guava", "Pomogranade", "DragonFruit", "Peach", "Apple"]
fruits.push("Mango")
fruits.shift()

// Question Number 8...
let arr = ["Divyanshu", "Divya", "Divyanshi", "Divyang", "Divyansh"]
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i])
}

// Question Number 9...
let person = {
    name: "Divyanshu",
    age: 25,
    city: "Rishikesh"
}
for (key in person) {
    console.log(person[key])
}

// Question Number 10...
setTimeout(function () {
    console.log("Time's up!")
}, 2000)

// LEVEL 02
// Question Number 1...
function runTwice(fn) {
    fn()
    fn()
}
runTwice(function () {
    console.log("Hello...!")
})

// Question Number 2...
function pure(a, b) {
    console.log(a * b)
}
let count = 0
function impure(a) {
    count++
    console.log(a + count)
}
pure(1, 2)
impure(5)

// Question Number 3...
function obj({ name, age }) {
    console.log(name, age)
}
obj({ name: "Divyanshu", age: 25 })

// Question Number 4...
let obj1 = {
    name: "Divyanshu",
    fn1: function () {
        console.log(this)
    },
    fn2: () => {
        console.log(this)
    }
}
obj1.fn1()
obj1.fn2()

// Question Number 5...
let arr1 = [1, 2, 3, 4, 5]
let newArr = arr1.map((val) => {
    return val * val
})
console.log(newArr)

// Question Number 6...
let arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let newarr = arr2.filter((val) => {
    if (val % 2 === 0) return val
})
console.log(newarr)

// Question Number 7...
let salary = [1000, 2000, 3000]
salary.reduce((acc, val) => {
    acc = acc + val
    return acc
}, 0)

// Question Number 8...
let names = ["Ayushi", "Nisha", "Pooja", "Swati", "Prerna"]
names.some((val) => {
    return val.length > 3
})

names.every((val) => {
    return val.length > 3
})

// Question Number 9...
let users = {
    name: "Divyanshu",
    age: 25,
    email: "cdivyanshu98@gmail.com"
}
Object.freeze(users) //cannot add any new values and change the previous one
Object.seal(users) // can change the previous values but cannot add any new value to the object

// Question Number 10...
let object = {
    user: {
        name: "Divyanshi",
        address: {
            city: "Rishikesh"
        }
    }
}
let { city } = object.user.address
console.log(city)