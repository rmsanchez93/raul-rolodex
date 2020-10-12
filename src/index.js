document.addEventListener('DOMContentLoaded', ()=>{
    console.log('HTML is loaded!! good luck Texas SE-082420!')
   let peopleContainer = document.querySelector('.container')

//    get all people
fetch('http://localhost:3000/people')
.then(res => res.json())
.then(people => {
    for(const peep of people){
        createDevCard(peep)
    }
})

function createDevCard(person){
    // what my card should look like :
    // <div class="card p-2 m-2" style="width: 18rem;">
    //         <img class="card-img-top" src="https://avatars3.githubusercontent.com/u/56845745?s=460&u=7974035c20f17528da0cd381492cb7a025d7392a&v=4"  alt="Raul the Instructor">
    //         <div class="card-body">
    //           <h5 class="card-title">Joe Burks</h5>
    //           <p class="card-text">Instructor</p>
    //           <p class="card-text">Prefered Pronouns: He/Him</p>
    //           <p class="card-text">Attended Flatiron? Yes!</p>
    //           <a href="https://github.com/Joseph-Burks" class="btn btn-primary">Go to Joe's GitHub</a>
    //         </div>
    //       </div>
    // create necessary elements
    let cardDiv = document.createElement('div')
    let img = document.createElement('img')
    let cardBody = document.createElement('div')
    let h5 = document.createElement('h5')
    let instructorText = document.createElement('p')
    let pronounText = document.createElement('p')
    let attendedText = document.createElement('p')
    let a = document.createElement('a')

    cardDiv.classList.add('card', 'p-2', 'm-2')
    cardDiv.style.width = '18rem'

    img.src = person.profilePicture
    img.classList.add('card-img-top')

    cardBody.classList.add('card-body')
    h5.className = 'card-title'
    h5.textContent = person.className

    instructorText.textContent = `Instructor or Alum? ${person['instructor?'] ? 'Instructor' : 'Alum'}`
    pronounText.textContent = ` Pronouns: ${person.pronouns}`

    attendedText.textContent = `Attended Flatiron? ${person['alum?'] ? 'yes' : 'no'}`

    a.classList.add("btn", "btn-primary")
    a.href = person.github
    a.textContent = `Go to ${person.name.split(' ')[0]}'s GitHub`
    // append elements
    cardBody.append(h5, instructorText, pronounText, attendedText, a)
    cardDiv.append(img, cardBody)
    // update DOM
    peopleContainer.append(cardDiv)

}
})