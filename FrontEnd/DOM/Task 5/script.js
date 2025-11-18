let btn = document.querySelector("button")
let main = document.querySelector("main")

let quotes = [
    "Dream big.",
    "Stay hungry, stay foolish.",
    "Be your own hero.",
    "Small steps make big changes.",
    "Believe in yourself.",
    "Everything is figureoutable.",
    "Choose courage over comfort.",
    "Progress, not perfection.",
    "Do it with passion or not at all.",
    "Focus on the good.",
    "The best time is now.",
    "Great things take time."
];


btn.addEventListener("click", () => {

    let x = Math.random() * 100
    let y = Math.random() * 100
    let z = Math.random() * 361

    let c1 = Math.random() * 256
    let c2 = Math.random() * 256
    let c3 = Math.random() * 256

    let sc = Math.floor(Math.random() * 3)

    let quote = Math.floor(Math.random() * quotes.length)

    let h1 = document.createElement("h1")
    h1.innerHTML = quotes[quote]
    h1.style.position = "absolute"
    h1.style.left = x + "%"
    h1.style.top = y + "%"
    h1.style.rotate = z + "deg"
    h1.style.color = `rgb(${c1},${c2},${c3})`
    h1.style.scale = sc

    main.appendChild(h1)
})