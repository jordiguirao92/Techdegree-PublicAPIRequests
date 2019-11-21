/*Remember: 
res => res.json()
===
function(res){
    return res.json();
}
*/


//API REQUEST

  //Other option is to get the data with jQuery using: $.getJSON("https://randomuser.me/api/?results=12", function(){}))
  fetchData("https://randomuser.me/api/?results=12")
  .then(data => {
      console.log(data);
      console.log(data.results);
      addUsers(data.results);
   })



//FUNCTIONS
function fetchData(url) { 
    return fetch(url)
    .then(checkStatus)
    .then(res => res.json())
    .catch(error => console.log('Looks like there was a problem', error)) 
}

function checkStatus(response){
    if (response.ok){
     return Promise.resolve(response);
    } else {
     return Promise.reject(new Error(response.statusText));
    }
   }


/*I have to add and unique id for every htmlcard in order to add the eventListener.
 I have investigate that i can select an element by their innerText with xpath, but it is out of the project scope. 
 With jquery would be more easy but I have started the project without using jquery. */
function addUsers(usersObject){
    console.log(usersObject);
    const users = usersObject.map(function(personObject, index) {
        let htmlCard = `<div class="card" id="${personObject.name.first}${personObject.name.last}">
        <div class="card-img-container">
            <img class="card-img" src="${personObject.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${personObject.name.first} ${personObject.name.last}</h3>
            <p class="card-text">${personObject.email}</p>
            <p class="card-text cap">${personObject.location.city}, ${personObject.location.state}</p>
        </div>
    </div> `;
     addEventListenerModal(personObject, usersObject, index);
        return htmlCard; 
    }).join('');

    console.log(users);
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = users;
    
   
 }
  //I have to add a setTimeout to give time to execute the function. 
  function addEventListenerModal(personObject, usersObject, index) {
    setTimeout(event => {
        const person = document.getElementById(`${personObject.name.first}${personObject.name.last}`);
        console.log(person);
        person.addEventListener('click', e => createModal(personObject, usersObject, index));
    },500) 
 } 

 
//Function to create the modal card when we click the userscard. 
 function createModal (personObject, usersObject, index) {
     const div = document.createElement('div');
     document.querySelector('body').appendChild(div);


     //Birthday date format.
     let date = personObject.dob.date;
     console.log(date);
     let newDate = date.split("T", 1);
     console.log(newDate);
     

     const htmlModal = `<div class="modal-container">
         <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${personObject.picture.large}" alt="profile picture">
                 <h3 id="name" class="modal-name cap">${personObject.name.first} ${personObject.name.last}</h3>
                <p class="modal-text">${personObject.email}</p>
                <p class="modal-text cap">${personObject.location.city}/p>
                <hr>
                <p class="modal-text">${personObject.cell}</p>
                <p class="modal-text">${personObject.location.street.number} ${personObject.location.street.name}, ${personObject.location.country}, ${personObject.location.postcode}</p>
                <p class="modal-text">Birthday: ${newDate}</p>
            </div>
        </div>

        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>`;
    div.innerHTML = htmlModal;

    //Adding event listenet to the previos button.
    document.getElementById('modal-prev').addEventListener('click', e => {
        div.remove();
        previousPerson(usersObject, index);
    })
    function previousPerson(usersObject, index){
        let prevPerson = usersObject[index -= 1];
        console.log (prevPerson);
        //Index is overwritten buy index -=1;
        createModal(prevPerson, usersObject, index);
    }

    //Adding event listener to the next button. 
    document.getElementById('modal-next').addEventListener('click', e => {
        div.remove();
        nextPerson(usersObject, index)
    })
    function nextPerson(usersObject, index){
        let nextPerson = usersObject[index += 1];
        console.log(nextPerson);
        //Index is overwritten buy index +=1;
        createModal(nextPerson, usersObject, index);
    }

     //Adding event listener to the close button. 
    document.getElementById('modal-close-btn').addEventListener('click', e => {
        div.remove();
    })

//Switch that disable the prev or next button according the index of the modalcard.
switch (index) {
case 0: 
    document.getElementById('modal-prev').disabled = true;
    console.log(index);
    break;
case 11:  
    document.getElementById('modal-next').disabled = true;
    console.log(index);
    break;
default: 
    document.getElementById('modal-next').disabled = false;
    console.log(index);
}

 }

 //Adding the search bar function to the html. 
addSearchBar();
function addSearchBar(){ 
    const searchContainer = document.querySelector('.search-container');
    const searchForm = `<form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>`;
    searchContainer.innerHTML = searchForm; 

    //Adding an event listener to the search-input. 
    document.getElementById('search-input').addEventListener('input', () => {
        let stringValue = document.getElementById('search-input').value.toLowerCase();
        searchUser(stringValue);
    });
}

//Function to seach a user by name. 
function searchUser (stringInput) {
    let userList = document.querySelectorAll('.card');
    for (i = 0; i < userList.length; i++) {
        let userName = userList[i].querySelector('h3').textContent.toLowerCase();
        if(userName.includes(stringInput)){
             userList[i].style.display = "";
        } else {
             userList[i].style.display = "none";
         }
    }  
}


 

 

 