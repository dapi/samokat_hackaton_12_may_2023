if(localStorage.getItem('token') == null || localStorage.getItem('token') ==undefined){
    window.location.href = "/login.html"
}
const token = localStorage.getItem('token');
function setOffices() {
    fetch('http://localhost:8000/api/office/', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization' : 'Token ' + token
        },
    })
    .then((response) => response.json())
    .then((result) => {
        for(let i=0; i<result.length; i++){
            const o = result[i];
            document.getElementById("office").innerHTML += `
                <option value="${o.id}">${o.office_location}</option>
            `;
        }
    })
    .catch(error => console.error(error));

}


function setDepartments() {
    fetch('http://localhost:8000/api/department/', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization' : 'Token ' + token
        },
    })
    .then((response) => response.json())
    .then((result) => {
        for(let i=0; i<result.length; i++){
            const d = result[i];
            document.getElementById("department").innerHTML += `
                <option value="${d.id}">${d.department_name}</option>
            `;
        }
    })
    .catch(error => console.error(error));

}
function setPositions() {
    fetch('http://localhost:8000/api/position/', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization' : 'Token ' + token
        },
    })
    .then((response) => response.json())
    .then((result) => {
        for(let i=0; i<result.length; i++){
            const d = result[i];
            document.getElementById("position").innerHTML += `
                <option value="${d.id}">${d.position_name}</option>
            `;
        }
    })
    .catch(error => console.error(error));

}

function getUserData() {
    fetch('http://localhost:8000/api/user/', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization' : 'Token ' + token
        },
    })
    .then((response) => response.json())
    .then((result) => {
        document.getElementById("email").value = result.email;
        document.getElementById("email_name").innerText = result.email;
        
    })
    .catch(error => console.error(error));

}
setOffices();
setDepartments();
setPositions();
getUserData();


document.getElementById('profile_form').addEventListener('submit', function(e) {
    e.preventDefault();
    let form = document.getElementById('profile_form');
    fetch('http://localhost:8000/api/profile/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Authorization' : 'Token ' + token
        },
        body: JSON.stringify({
            "name" : e.target.name.value, 
            "gender" : e.target.gender.value, 
            "age" : e.target.age.value, 
            "department" : e.target.department.value, 
            "position" : e.target.position.value, 
            "office" : e.target.office.value, 
            "description" : e.target.description.value, 
            "contact" : e.target.contact.value,
            "address" : e.target.address.value
        })
    })
    .then((response) => response.json())
    .then((result) => {
        console.log(result)
        // profile
    })
    .catch(error => console.error(error));
    form.reset()
}, true);


function fillProfileData(){
    fetch('http://localhost:8000/api/profile/', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization' : 'Token ' + token
        }
    })
    .then((response) => response.json())
    .then((result) => {
        document.getElementById("name").value = result.name;
        document.getElementById("gender").value = result.gender;
        document.getElementById("age").value = result.age;
        document.getElementById("description").value = result.description;
        document.getElementById("contact").value = result.contact;
        document.getElementById("address").value = result.address;
        
        document.getElementById("position").value = result.position;
        document.getElementById("department").value = result.position;
        document.getElementById("office").value = result.position;
        // profile
    })
    .catch(error => console.error(error));
}

fillProfileData();


function AddExperience(){
    fetch('http://localhost:8000/api/experience/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Authorization' : 'Token ' + token
        },
        body: JSON.stringify({
            "company" : document.getElementById("exp_company").value, 
            "role" : document.getElementById("exp_role").value, 
            "joined" : document.getElementById("exp_joined").value, 
            "left" : document.getElementById("exp_left").value, 
            "details" : document.getElementById("exp_details").value, 
        })
    })
    .then((response) => response.json())
    .then((result) => {
        console.log(result)
        // profile
    })
    .catch(error => console.error(error));
}function AddSocailLink(){
    fetch('http://localhost:8000/api/social/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Authorization' : 'Token ' + token
        },
        body: JSON.stringify({
            "name" : document.getElementById("lnk_name").value, 
            "url" : document.getElementById("ln_link").value, 
        })
    })
    .then((response) => response.json())
    .then((result) => {
        console.log(result)
        // profile
    })
    .catch(error => console.error(error));
}