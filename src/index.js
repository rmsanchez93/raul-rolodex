// when page loads
document.addEventListener('DOMContentLoaded', ()=>{
    console.log('HTML is loaded!! good luck Lord of the Strings!')
    //we want to get all People
    getPeople()
    //we want to add form functionality
    setUpAddPerson()
})

function getPeople(){
    fetch('http://localhost:3000/people') //GET request
    .then(res=> res.json()) //parse request
    .then(peopleData => {
        //log response
        console.log(peopleData)
        //iterate through 
        //and for each person
        peopleData.forEach(peep => {
            //format data from our objects 
            const firstName = peep.name.split(' ')[0]
            //we want to render a div 
            const peepDiv = document.createElement('div')
            peepDiv.style.width = '18rem'
            // peepDiv.className = "card p-2 m-2"
            peepDiv.classList.add('card', 'p-2', 'm-2')

            //create img tag
            const peepImg = document.createElement('img') 
            //add peep's image link to src
            peepImg.src = peep.profilePicture
            //add  any  classes 
            peepImg.className = 'card-img-top'
            //add alt text
            peepImg.alt = `${firstName} the ${peep['instructor?'] ? 'Instructor' : 'Alum'}`

            //create card-body
            const peepCardBody = document.createElement('div')
            peepCardBody.className = 'card-body'
            //create h5 tag for persons name 
            const peepName = document.createElement('h5')
            peepName.innerText = peep.name
            peepName.setAttribute('id', "person"+peep.id)
            //create tags for persons attributes
            const peepInstructor = document.createElement('p')
            peepInstructor.innerText = peep['instructor?'] ? 'Instructor' : 'Not an Instructor'
            const peepPronouns = document.createElement('p')
            peepPronouns.innerText = peep.pronouns
            const peepAttended = document.createElement('p')
            if(peep['alum?']){
                peepAttended.innerText = 'Alum'   
            }else {
                peepAttended.innerText = 'Not an Alum'
            }


            // ************* UPDATE deliiverable
            const editButton = document.createElement('button')
            editButton.innerText = 'Edit Name'

            editButton.addEventListener('click', ()=>{
                console.log('this persons name should be chnaged', peep)
                appendEditForm(peepCardBody, peep)
            })



            //add classes 
            //append to card
            peepCardBody.append(peepName, peepInstructor, peepPronouns, peepAttended, editButton)

            //append to its parent container
            peepDiv.append(peepImg, peepCardBody)

            //append to DOM
            //find where we want to append it
            const peopleContainer = document.getElementById('people')
            peopleContainer.append(peepDiv)

        }) 



    })  
}

function setUpAddPerson(){
    const form = document.querySelector('#person-form') //getElementById works too
    form.addEventListener('submit', (e)=>{
        e.preventDefault() //prevent default nature of form, no refreshing
        console.log('form submitted')
        console.log(e.target[0].value)

        const newPerson ={
            name: e.target[0].value,
            pronouns: e.target[1].value,
            'alum?': e.target[2].value,
            'instructor?':e.target[3].value,
            github: e.target[4].value,
            profilePicture: e.target[5].value
        }
        console.log(newPerson)

        const optionsObject = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify(newPerson)
        }
       
        //POST request
        fetch('http://localhost:3000/people', optionsObject)
        .then(res=> res.json())
        .then(data => console.log(data))
    })
}

function appendEditForm(div, person){
    console.log(div, person)
    const editForm = document.createElement('form')
    const editName = document.createElement('input')
    editName.placeholder = person.name
    editForm.addEventListener('submit', (e)=>{
        e.preventDefault()
        console.log('EDIT THIS')
        fetch(`http://localhost:3000/people/${person.id}`,{
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: e.target[0].value
            })
        })
        .then(res=> res.json())
        .then(updatedPeep => {
            //find h5 tag
            const newPeepName =  document.getElementById(`person${person.id}`)
            newPeepName.innerText = updatedPeep.name
            editForm.remove()
        })
    })
    editForm.append(editName)
    div.append(editForm)
}
// getPeople()