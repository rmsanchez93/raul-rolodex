const prefixURL = "http://localhost:3000/people/"

const getPeople = () => {
    fetch(prefixURL)
    .then(res => res.json())
    .then( people => people.forEach(person => addPersonInfoToCard(person)))
}
const addPersonInfoToCard = (person) => {
    const peopleCont = document.getElementById("people")

    const personCard = document.createElement("div")
        personCard.className = "card-p-2-m-2"
        personCard.style.width = "18rem"
    const img = document.createElement("img")
        img.classList.add("card-img-top")
        img.alt = `${person.name}`
        img.setAttribute("src", person.profilePicture)

    const cardBody = document.createElement("div")
        cardBody.classList.add("card-body")
    const h5 = document.createElement("h5")
        h5.classList.add("card-title")
        h5.innerText = person.name
    const roleP = document.createElement("p")
        roleP.classList.add("card-text")
        if (person["instructor?"] === true) {
            roleP.innerText = "Instructor"        
        } else {
            roleP.innerText = "Alumni"
        }
    const pronounsP = document.createElement("p")
        pronounsP.classList.add("card-text")
        pronounsP.innerText = `preferred pronouns: ${person.pronouns}`
        pronounsP.style.textTransform = "capitalize"
    const schoolP = document.createElement("p")
        schoolP.classList.add("card-text")
        if (person["alum?"] === true) {
            schoolP.innerText = "Attended Flatiron? Yes"
        } else {
            schoolP.innerText = "Attended Flatiron? No"
        }
    const githubLink = document.createElement("a")
        githubLink.setAttribute("href", person.github)
        githubLink.className = "btn btn-primary"
        githubLink.innerText = `Go to ${firstName(person.name)}'s Github`
    
    cardBody.append(h5, roleP, pronounsP, schoolP, githubLink)
    personCard.append(img, cardBody)
    peopleCont.append(personCard)
}
function firstName(name) {
    const nameArray = name.split(" ")
    return nameArray[0]
}

function evaluateTruth(string) {
    if (string == "true") {
        return string = true
    } else {
        return string = false
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    console.log('HTML is loaded!! good luck Codevid-19!');
    getPeople()

    const form = document.getElementById("person-form")
    form.addEventListener("submit", function(e){
        e.preventDefault()
        // console.log(`alumni? ${typeof e.target.alum.value}`, `instructor? ${e.target.instructor.value}`)
        const newPerson = {
            name: e.target.name.value,
            pronouns: e.target.pronouns.value,
            "alum?": evaluateTruth(e.target.alum.value),
            "instructor?": evaluateTruth(e.target.instructor.value),
            github: e.target.github.value,
            profilePicture: e.target.profile.value
        }
        const configPerson = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newPerson)
        }
        fetch(prefixURL, configPerson)
        .then(res => res.json())
        .then(person => addPersonInfoToCard(person))

        form.reset();
    })
})