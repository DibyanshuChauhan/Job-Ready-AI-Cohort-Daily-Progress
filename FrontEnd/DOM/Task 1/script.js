const inc = document.querySelector("#inc")
const dec = document.querySelector("#dec")
const reset = document.querySelector("#reset")
const h2 = document.querySelector("h2")

let a = 0
inc.addEventListener("click", function () {
    a++
    h2.innerHTML = a
})

dec.addEventListener("click", function () {
    a--
    h2.innerHTML = a
})

reset.addEventListener("click", function () {
    a = 0
    h2.innerHTML = a
})