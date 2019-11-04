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


function addUsers(userObject){
    console.log(userObject);
    const users = userObject.map(function(userObject) {
        let htmlCard = `<div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${userObject.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${userObject.name.first} ${userObject.name.last}</h3>
            <p class="card-text">${userObject.email}</p>
            <p class="card-text cap">${userObject.location.city}, ${userObject.location.state}</p>
        </div>
    </div> `;
        return htmlCard; 
    }).join('');

    console.log(users);
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = users;
 }

 function createModal (user, index) {
     const body = document.querySelector('body');
     const div = document.createElement('div').className('modal-container').appendChild(body);

     const htmlModal = `<div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${user.picture.large}" alt="profile picture">
                 <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="modal-text">${user.email}</p>
                <p class="modal-text cap">${user.location.city}/p>
                <hr>
                <p class="modal-text">${user.cell}</p>
                <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.country}, ${user.location.postcode}</p>
                <p class="modal-text">Birthday: ${user.dob.date}</p>
            </div>
        </div>

        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>`;

    div.innerHTML = htmlModal;
    if (index >= 11) {}


 }


 