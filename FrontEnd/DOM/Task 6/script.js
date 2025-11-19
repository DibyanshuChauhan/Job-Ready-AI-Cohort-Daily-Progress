let grow = 0
let btn = document.querySelector("button")
let h2 = document.querySelector("h2")
let inner = document.querySelector(".inner")

let num = 50 + Math.floor(Math.random() * 50)

btn.addEventListener("click", function () {
    btn.style.pointerEvents = "none"
    let int = setInterval(function () {
        grow++
        h2.innerHTML = grow + "%"
        inner.style.width = grow + "%"
    }, num)

    setTimeout(function () {
        clearInterval(int)
        btn.innerHTML = "Downloaded"
        btn.style.opacity = 0.5
    }, num * 100)
})