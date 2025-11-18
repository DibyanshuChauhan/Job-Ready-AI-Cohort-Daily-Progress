const iplTeams = [
    {
        team: "Chennai Super Kings",
        primaryColor: "yellow",
        secondaryColor: "blue",
        captain: "Ruturaj Gaikwad",
        trophiesWon: 5
    },
    {
        team: "Mumbai Indians",
        primaryColor: "blue",
        secondaryColor: "gold",
        captain: "Hardik Pandya",
        trophiesWon: 5
    },
    {
        team: "Royal Challengers Bengaluru",
        primaryColor: "black",
        secondaryColor: "gold",
        captain: "Faf du Plessis",
        trophiesWon: 0
    },
    {
        team: "Kolkata Knight Riders",
        primaryColor: "purple",
        secondaryColor: "gold",
        captain: "Shreyas Iyer",
        trophiesWon: 3
    },
    {
        team: "Rajasthan Royals",
        primaryColor: "pink",
        secondaryColor: "blue",
        captain: "Sanju Samson",
        trophiesWon: 1
    },
    {
        team: "Sunrisers Hyderabad",
        primaryColor: "orange",
        secondaryColor: "black",
        captain: "Pat Cummins",
        trophiesWon: 2
    },
    {
        team: "Delhi Capitals",
        primaryColor: "blue",
        secondaryColor: "red",
        captain: "Rishabh Pant",
        trophiesWon: 0
    },
    {
        team: "Punjab Kings",
        primaryColor: "red",
        secondaryColor: "gold",
        captain: "Shikhar Dhawan",
        trophiesWon: 0
    }
];


let btn = document.querySelector("button")
let h2 = document.querySelector("h2")
let cap = document.querySelector("#cap")
let trophies = document.querySelector("h3")
let main = document.querySelector("main")

btn.addEventListener('click', function () {
    let winner = iplTeams[Math.floor(Math.random() * iplTeams.length)]
    h2.innerHTML = winner.team
    cap.innerHTML = winner.captain
    trophies.innerHTML = winner.trophiesWon
    h2.style.backgroundColor = winner.secondaryColor
    main.style.backgroundColor = winner.primaryColor
})