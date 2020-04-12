// Norman Lew

// This is the script for the Employee-Directory project

const body = document.querySelector('body');
const numOfEmployees = 12;
const randomUsersURL = `https://randomuser.me/api/?results=${numOfEmployees}`;
const divGallery = document.getElementById('gallery')
let employees;

/**
* Generalized fetch
* This function was copy and pasted from sample projects at teamtreehouse.com
* @return {Object} Promise to be returned
* @param {String} The url data is to be fetched from
*/
async function getJSON(url) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      throw error;
    }
}

/**
* Performs fetch at the url and returns the response in JSON format
* @return {Array} Random employees returned as an array of Objects
* @param {String} The url data is to be fetched from
*/
async function getEmployees(url) {
    const employeesJSON = await getJSON(url);
    return employees = employeesJSON.results;
}

/**
* Display users on the screen
* @param {Array} Employee objects
*/
function displayUsers(users) {
    for (let i = 0; i < users.length; i++) {
        divGallery.innerHTML += `
            <div class="card">
                <div class="card-img-container">
                    <img class="card-img" src="${users[i].picture.large}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="${i}" class="card-name cap">${users[i].name.first} ${users[i].name.last}</h3>
                    <p class="card-text">${users[i].email}</p>
                    <p class="card-text cap">${users[i].location.city}, ${users[i].location.state}</p>
                </div>
            </div>
        `;
    }
}


/**
* Display modal user on the screen with full information about the user
* @param {Integer} The id we use to assign to an employee.  The is also
*                  used to access the employee's information in the employee
*                  array created during the first API fetch
*/
function displayModal(id) {
    const emp = employees[id];
    let birthday = emp.dob.date;
    const month = birthday.substring(5, 7);
    const day = birthday.substring(8, 10);
    const year = birthday.substring(0, 4);
    const divModalContainer = document.createElement('div');
    divModalContainer.className = 'modal-container';
    divModalContainer.innerHTML = `
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${emp.picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${emp.name.first} ${emp.name.last}</h3>
                    <p class="modal-text">${emp.email}</p>
                    <p class="modal-text cap">${emp.location.city}</p>
                    <hr>
                    <p class="modal-text">${emp.cell}</p>
                    <p class="modal-text">${emp.location.street.number} ${emp.location.street.name} ${emp.location.city},
                    ${emp.location.state} ${emp.location.postcode}</p>
                    <p class="modal-text">Birthday: ${month}/${day}/${year}</p>
                </div>
        </div>
    `
    body.insertBefore(divModalContainer, document.querySelector('script'));
    document.getElementById('modal-close-btn').addEventListener('click', (e) =>{
        body.removeChild(divModalContainer);
    });
}

// Display all the random users on the screen
getEmployees(randomUsersURL)
    .then(displayUsers);

// Listen for when a user's profile is clicked
body.addEventListener('click', (e) => {
    let containerElement = e.target;

    if (containerElement.textContent !== 'X') {
        while (containerElement.tagName !== 'BODY') {
            if (containerElement.className !=='card') {
                containerElement = containerElement.parentElement;
            }
            else {
                break;
            }
        }

        if (containerElement.className === 'card') {
            const cardInfoDiv = containerElement.children[1];
            const h3 = cardInfoDiv.children[0];
            displayModal(parseInt(h3.id));
        }
    }
});
