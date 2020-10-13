document.addEventListener('DOMContentLoaded', ()=>{ //event listening to run AFTER content is loaded
    // console.log('HTML is loaded!! good luck Texas SE-082420!')
    // declare variable that I will need
    const peopleURL = "http://localhost:3000/people"
    const peopleContainer = document.querySelector('#people')
    const form = document.querySelector('#person-form')
    // console.log(peopleContainer)

    // when page loads, I want to dynamiically load our people from the iimitated server to our DOM
    // fetch
    fetch(peopleURL)
    .then(function(response){
       return response.json() //spooky season, we summon this function
    }) //parse data usinig .json() function
    .then(function(people){
        // console.log(people)
        // for(const peep of people){     //this is a for of loop to iterate through array
        //     console.log(peep)
        // }
        // for(let i = 0; i < people.length; i++){
        //     console.log(people[i])
        // }
        people.forEach(function(peep){
            renderPerson(peep)
        })
    })

    function renderPerson(peep){
        // console.log(peep)
        // create a div 
        // <div class="card p-2 m-2" style="width: 18rem;">
        let div = document.createElement('div')
        div.setAttribute('class', "card p-2 m-2") //set class attribute to "card p-2 m-2"
        div.classList.add('card', 'p-2', 'm-2') //also works
        div.style.width = '18rem'

        let img = document.createElement('img')
        img.src = peep.profilePicture
        img.className = "card-img-top"

        let divBody = document.createElement('div')
        divBody.className = "card-body"

        // create elements that will go in divBody
        // <h5 class="card-title"> person_name </h5>
        // <p class="card-text"> person_insturctor_alum </p>
        // <p class="card-text">Prefered Pronouns: person_pronouns </p>
        // <p class="card-text">Attended Flatiron?  person_attended_flatiron </p>
        // <a href= person_github_url class="btn btn-primary"> Go to person_first_name's GitHub </a>

        let h5 = document.createElement('h5')
        h5.className = "card-title"
        h5.innerText = peep.name

        let p1 = document.createElement('p')
        p1.className = "card-text"
        p1.innerText = peep["instructor?"] ? "Instructor" : "Alum"
        let p2 = document.createElement('p')
        p2.className = "card-text"
        p2.innerText =  `Prefered Pronouns: ${peep.pronouns}`     // "Prefered Pronouns: "+peep.pronouns
        let p3 = document.createElement('p')
        p3.className = "card-text"
        p3.innerText = `Attended Flatiron? ${peep["alum?"] ? "Yes!": "No"}`

        let btn = document.createElement('a')
        btn.classList.add("btn",  "btn-primary")
        btn.href = peep.github
        btn.innerText = `Go to ${peep.name.split(" ")[0]}'s GitHub`

        divBody.append(h5, p1, p2, p3, btn)

        // append img to div
        div.append(img, divBody)
        //  append div with class card-body to div
        // append to DOM
        peopleContainer.append(div)
    } //end of renderPerson function

    // adding eventListener to my form (which I already declared above)
    form.addEventListener("submit", function(e){
        console.log(e.target[0].value)
        e.preventDefault()
        // on submit we stop the default nature of our form so we can access data 
        let name = document.querySelector('#name').value
        let pronouns = document.querySelector('#pronouns').value
        let alum = document.querySelector('#alum').value
        let instructor = document.querySelector('#instructor').value
        let github = document.querySelector('#github').value
        let profilePicture = document.querySelector('#profile').value

        console.log(name, pronouns, alum, instructor, github, profilePicture)

        fetch(peopleURL,{
            method: 'POST',
            headers: {
                "Content-Type":"application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "name": name,
                "pronouns": pronouns,
                "alum?": alum,
                "instructor?": instructor,
                "github": github,
                "profilePicture": profilePicture
            }) // end of body
        }) //end of initial fetch
        .then(function(res){
            return res.json()
        })
        .then(function(data){
            console.log(data)
            renderPerson(data)

        })

    })
}) //end of DOMContentLoaded event listener

