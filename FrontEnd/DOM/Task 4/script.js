let btn = document.querySelector("button")
let main = document.querySelector("main")

btn.addEventListener("click", function () {

    let x = Math.random() * 100
    let y = Math.random() * 100
    let z = Math.random() * 100

    let c1 = Math.floor(Math.random() * 356)
    let c2 = Math.floor(Math.random() * 356)
    let c3 = Math.floor(Math.random() * 361)

    let div = document.createElement("div")
    div.style.height = "50px"
    div.style.width = "50px"
    div.style.position = "absolute"
    div.style.left = x + "%"
    div.style.top = y + "%"
    div.style.rotate = z + "deg"
    div.style.backgroundColor = `rgb(${c1},${c2},${c3})`

    main.appendChild(div)
})