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
** you should not have to change anything in the index.html **
