# Raul's Rolodex

Solo lab created for the purpose of practicing fetch. JSON data will include past alumni and instructors in an effort to showcase the underrepresented in tech. 


## Create Your Server

All of the people data is stored in the `db.json` file. You'll want to access this
data using a JSON server. In order to do this, run the following two commands:

   * `npm install -g json-server`
   * `json-server --watch db.json`
   
This will create a server storing all of our lost toy data with restful routes
at `http://localhost:3000/people`. You can also check out
`http://localhost:3000/people/:id`

## Look At What We Have To Start With 

This index.html is heavily relying on bootstrap styling, get comfortable at going through the index.html page. 
Sometimes it can help to 'collaspe' larger divs to find a particular div. 
**you should NOT have to change anything in the index.html**

## Fetch and Update DOM with People 

On the `index.html` page, there is a `div` with the `id` "people".

When the page loads, make a 'GET' request to fetch all the person objects. With the
response data, make a `<div class="card p-2 m-2" style="width: 18rem;">` for each person and add it to the
people `div`.

## Add Person Info to the Card

Each card should have the following child elements:

  * `img` tag with the `src` of the person's image attribute and the class name "card-img-top" (bonus: there's an alt property we can change for accessibility, try updating with the person's name followed by their role(either instructor or alum) i.e. 'Joe, instructor', or 'Lili, alum')
  * `div` tag with a class "card-body"
  
  
The `div` with class "card-body" has child elements: 
  * `h5` tag with a class "card-title" whose text is set to the person's name property
  *  `p` tag that conditionally renders Either Alum or Instructor based on a person's 'instructor?' property
  *  `p` tag that displays the person's pronouns 
  *  `p` tag that conditionally renders whether or not this person attended Flatiron School. 
  *  `a` with an href set to the person's github, and a class "btn btn-primary" whose text is set to "Go to <person's first name> 's GitHub"
  
          How we get a person's first name from their name? 
          What does conditionally rendering mean?? (I'll post a link at the end of this readme)
          Hint => look up ternary operators, but feel free to ask for help if this becomes confusing
          
  **All `p` tags have a class "card-text"**
  

After all of that, the toy card should resemble:

```html
  <div class="card p-2 m-2" style="width: 18rem;">
            <img src=person_image_url class="card-img-top" alt=person_first_name_and_either_alum_instructor>
            <div class="card-body">
              <h5 class="card-title"> person_name </h5>
              <p class="card-text"> person_insturctor_alum </p>
              <p class="card-text">Prefered Pronouns: person_pronouns </p>
              <p class="card-text">Attended Flatiron?  person_attended_flatiron </p>
              <a href= person_github_url class="btn btn-primary"> Go to person_first_name's GitHub </a>
            </div>
          </div>
```
