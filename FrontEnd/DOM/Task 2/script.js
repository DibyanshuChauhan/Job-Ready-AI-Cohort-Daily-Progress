let btn = document.querySelector("button")
let box = document.getElementById("box")

btn.addEventListener("click", function () {
    let color1 = Math.floor(Math.random() * 256)
    let color2 = Math.floor(Math.random() * 256)
    let color3 = Math.floor(Math.random() * 256)

    box.style.backgroundColor = `rgb(${color1},${color2},${color3})`
})