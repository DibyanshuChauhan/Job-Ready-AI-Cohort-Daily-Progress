// Question Number 01...
for (let i = 1; i <= 10; i++) {
    console.log(i)
}

// Question Number 02...
for (let i = 1; i <= 20; i++) {
    if (i % 2 === 0) {
        console.log(i)
    }
}

// Question Number 03...
for (i = 10; i >= 1; i--) {
    console.log(i)
}

// Question Number 04...
for (i = 1; i <= 5; i++) {
    console.log("Yes")
}

// Question Number 05...
for (let i = 1; i <= 10; i++) {
    //i % 2 === 0 ? console.log("Even") : console.log("Odd")
    if (i % 2 === 0) console.log(`${i} - Even`)
    else console.log(`${i} - Odd`)
}

// Question Number 06...
let num = prompt("Enter a value")
if (num === null) {
    console.log("You pressed cancel...")
}
else {
    if (num.trim() === "") {
        console.log("Please type something")
    }
    else {
        num = Number(num)
        if (isNaN(num)) {
            console.log("Please enter a number...")
        }
        else {
            if (num >= 0) console.log("Positive Number...")
            else console.log("Negative Number...")
        }
    }
}

// Question Number 07...
let age = prompt("Enter user's age...")
if (age === null) {
    console.log("You pressed cancel...")
}
else {
    if (age.trim() === "") {
        console.log("Please type something")
    }
    else {
        age = Number(age)
        if (isNaN(age)) {
            console.log("Please enter a number...")
        }
        else {
            if (age < 0) console.log("Invalid age...")
            else if (age >= 18) console.log("You are eligible to vote.")
            else console.log("You are not eligible to vote.")
        }
    }
}

// Question Number 08...
for (let i = 1; i <= 10; i++) {
    console.log(`5 X ${i} = ${5 * i}`)
}

// Question Number 09...
let count = 0
for (let i = 1; i <= 15; i++) {
    if (i > 8) {
        count++
        console.log(`from 1 to 15 numbers grater than 8 is ${i}`)
    }
}
console.log(`Total numbers from 1 to 5 which are grater than 5 are ${count}`)

// Question Number 10...
let password = "Sheryians"
let pass = prompt("Enter the password")
if (pass === null) {
    console.log("You pressed cancel...")
}
else {
    if (pass.trim() === "") console.log("Please type the password...")
    else if (pass.trim() === password) console.log("Password matched")
    else console.log("Password didn't match")
}

// Question Number 11...
let attempts = 0
let opened = false
let pass1 = "sheryians"
let password1 = prompt("Enter your password!...")
attempts++

if (password1 === pass1) opened = true

while (password1 !== pass1) {
    if (attempts === 3) {
        console.error("Account Locked")
        break
    }
    password1 = prompt("Enter your password!...")
    if (password1 === pass1) opened = true
    attempts++
}
if (opened) console.log("Account opened...")

// Question Number 12...
let word = prompt("Enter your Word...")
let counter = 0

while (word !== "stop") {
    if (word === "yes") counter++
    word = prompt("Enter your Word...")
}

// Question Number 13...
for (let i = 1; i <= 50; i++) {
    if (i % 7 === 0) {
        console.log(i)
    }
}

// Question Number 14...
let sum = 0
for (let i = 1; i <= 30; i++) {
    if (i % 2 !== 0) {
        sum = sum + i
    }
}
console.log(`total sum of numbers from 1 to 30 is ${sum}`)

// Question Number 15...
let input = +prompt("Enter the number...")

while (input % 2 !== 0) {
    input = +prompt("Enter the number...")
    if (input % 2 === 0) break
}
console.log("You have entered an even number...")

// Question Number 16...
let initial = +prompt("Enter the first number")
let ending = +prompt("Enter the second number")

if (ending > initial) {
    for (let i = ending; i >= initial; i--) {
        console.log(i)
    }
}
else {
    for (let i = initial; i <= ending; i++) {
        console.log(i)
    }
}

// Question Number 17...
let counter1 = 0;
for (let i = 1; i <= 20; i++) {
    if (counter1 === 3) break
    if (i % 2 !== 0) {
        counter1++
    }
}

// Question Number 18...
let counter2 = 0
for (let i = 1; i <= 5; i++) {
    let val = +prompt("Enter the value to check wheather it is positive or not")
    if (i >= 0) counter2++
}
console.log(`total positive numbers are ${counter2}`)

// Question Number 19...
let balance = 1000
let count1 = 0
let flag = false
while (balance > 0 && count1 !== 3) {
    let withdrawl = +prompt("How much amount to be withdrwal")
    count1++
    if (withdrawl <= balance) balance -= withdrawl
    else {
        flag = true
        break
    }
}
if (flag) console.log("Insufficient balance")
console.log(`balance: ${balance}`)