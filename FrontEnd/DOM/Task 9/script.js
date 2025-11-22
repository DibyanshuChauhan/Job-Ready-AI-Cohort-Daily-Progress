let btn = document.querySelectorAll(".drum")

btn.forEach((val) => {
    val.addEventListener("click", () => {

        let buttonInnerHTML = val.innerHTML
        makeSound(buttonInnerHTML)


    })
})

document.addEventListener("keypress", function (e) {
    makeSound(e.key)
})

function makeSound(key) {
    switch (key) {
        case "w":
            var audio = new Audio("./Assets/sounds/tom-1.mp3")
            audio.play()
            break

        case "a":
            var audio = new Audio("./Assets/sounds/tom-2.mp3")
            audio.play()
            break

        case "s":
            var audio = new Audio("./Assets/sounds/tom-3.mp3")
            audio.play()
            break

        case "d":
            var audio = new Audio("./Assets/sounds/tom-4.mp3")
            audio.play()
            break

        case "j":
            var audio = new Audio("./Assets/sounds/snare.mp3")
            audio.play()
            break

        case "k":
            var audio = new Audio("./Assets/sounds/crash.mp3")
            audio.play()
            break

        case "l":
            var audio = new Audio("./Assets/sounds/kick-bass.mp3")
            audio.play()
            break

        default:
            console.log(buttonInnerHTML)

    }
}