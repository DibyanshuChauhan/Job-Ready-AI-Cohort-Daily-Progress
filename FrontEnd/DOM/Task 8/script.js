const users = [
    {
        fullName: "Ava Thompson",
        image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1200&q=80",
        profession: "UX Designer",
        description: "Ava is a user-centered designer focused on creating intuitive digital experiences.",
        tags: ["design", "ux", "creative", "ui/ux"]
    },
    {
        fullName: "Daniel Reyes",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
        profession: "Software Engineer",
        description: "Daniel specializes in full-stack development and scalable cloud architecture.",
        tags: ["javascript", "cloud", "fullstack", "backend"]
    },
    {
        fullName: "Maya Patel",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80",
        profession: "Data Scientist",
        description: "Maya uses machine learning and statistical modeling to solve business problems.",
        tags: ["python", "machine learning", "data", "ai"]
    },
    {
        fullName: "Lucas Robinson",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80",
        profession: "Photographer",
        description: "Lucas is a professional photographer capturing portraits and lifestyle imagery.",
        tags: ["photography", "art", "creative", "portraits"]
    },
    {
        fullName: "Sofia Mendes",
        image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=80",
        profession: "Marketing Strategist",
        description: "Sofia leads digital marketing campaigns and brand-growth initiatives.",
        tags: ["marketing", "branding", "strategy", "social media"]
    },
    {
        fullName: "Liam Rodriguez",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
        profession: "Full-Stack Developer",
        description: "Liam specializes in building scalable web applications with a focus on performance and accessibility.",
        tags: ["javascript", "fullstack", "react", "node"]
    },
    {
        fullName: "Sophia Martinez",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
        profession: "Digital Marketer",
        description: "Sophia crafts data-driven marketing strategies that help brands grow and engage with audiences.",
        tags: ["marketing", "branding", "seo", "strategy"]
    },
    {
        fullName: "Ethan Walker",
        image: "https://images.unsplash.com/photo-1631885628726-d60689c330db?q=80&w=685&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        profession: "Data Scientist",
        description: "Ethan uses machine learning and statistical analysis to uncover insights from complex datasets.",
        tags: ["data", "python", "machine learning", "ai"]
    }
];

let char = ``

users.forEach((elem) => {
    char = char + `<div id="card">
            <img src="${elem.image}"
                alt="">
            <h1 class="name">${elem.fullName}</h1>
            <h2 class="profession">${elem.profession}</h2>
            <p class="description">${elem.description}</p>
            <div id="tags">
                <ul>${elem.tags}</ul>
            </div>
        </div>`
})

let main = document.querySelector("main")
main.innerHTML = char