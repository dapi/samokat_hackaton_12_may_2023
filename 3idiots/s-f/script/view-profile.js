if(localStorage.getItem('token') == null || localStorage.getItem('token') == undefined){
    window.location.href = "/login.html"
}
const token = localStorage.getItem('token');
let id =""
const url_string = window.location.href;
const uri = new URL(url_string);
if (uri.searchParams.get("id") != "") {
    id = uri.searchParams.get("id");
}else{
    window.location.href = "/home.html"
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
        document.getElementById("email_name").innerText = result.email;
        
    })
    .catch(error => console.error(error));

}

getUserData();


function userSearchProfile(uid) {
    let form = document.getElementById('profile_form');
    fetch('http://localhost:8000/api/search/'+uid+'/', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization' : 'Token ' + token
        }
    })
    .then((response) => response.json())
    .then((result) => {
        console.log(result)
        document.getElementById("name").innerText = result.name;
        // document.getElementById("gender").innerText = result.gender;
        document.getElementById("age_gender").innerText = result.age + " years, " + result.gender;
        document.getElementById("description").innerText = result.description;
        document.getElementById("contact").innerText = result.contact;
        document.getElementById("address").innerText = result.address;
        
        document.getElementById("position").innerText = result.position;
        document.getElementById("department").innerText = result.department + " Department";
        document.getElementById("office").innerText = result.office + " Office";


        for(let i=0; i<result.images.length; i++){
            const img = result.images[i];
            document.getElementById("img_gallary").innerHTML = `<li>
                <a href="http://localhost:8000/${img}" data-fancybox="gallery">
                    <img src="http://localhost:8000/${img}" alt="Feature">
                </a>
            </li>
            `;
        }

        for(let i=0; i<result.experiences.length; i++){
            const exp = result.experiences[i];
            document.getElementById("exp_list").innerHTML += `
                <li>
                    <div class="experience-user">
                        <div class="before-circle"></div>
                    </div>
                    <div class="experience-content">
                        <div class="timeline-content">
                            <a class="name"> ${exp.company}</a>
                            <p>${exp.role}</p>
                            <span class="time"> ${exp.joined} - ${exp.left}</span>
                        </div>
                        <p>${exp.details}</p>
                    </div>
                </li>
            `;
        }

        for(let i=0; i<result.socails.length; i++){
            const sc = result.socails[i];
            document.getElementById("socail_list").innerHTML += `<li>
                <a href="${sc.link}" target="_blank"> ${sc.name} </a>
            </li>
            `;
        }
    })
    .catch(error => console.error(error));

}
userSearchProfile(id);

