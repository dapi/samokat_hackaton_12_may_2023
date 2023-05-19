if(localStorage.getItem('token') == null || localStorage.getItem('token') ==undefined){
    window.location.href = "/login.html"
}
const token = localStorage.getItem('token');

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

function searchProfile(){
    let k = "";
    if (document.getElementById("k").value != ''){
        k = document.getElementById("k").value;
    }
    fetch('http://localhost:8000/api/search/?k='+k, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization' : 'Token ' + token
        },
        
    })
    .then((response) => response.json())
    .then((result) => {
        document.getElementById("search_result_area").innerHTML = '';
        for(let i=0; i<result.profiles.length; i++){
            const pr = result.profiles[i];
            document.getElementById("search_result_area").innerHTML += `
                    <div class="appointment-list">
                    <div class="profile-info-widget">
                        <a href="/view-profile.html?id=${pr.id}" class="booking-doc-img">
                            <img src="assets/img/patients/patient1.jpg" alt="User Image">
                        </a>
                        <div class="profile-det-info">
                            <h3><a href="/view-profile.html?id=${pr.id}"> ${pr.name} </a></h3>
                            <div class="patient-details">
                                <h5><i class="fas fa-map-marker-alt"></i> ${pr.address} </h5>
                                <h5><i class="fas fa-envelope"></i> ${pr.gender}</h5>
                                <h5 class="mb-0"><i class="fas fa-phone"></i> ${pr.contact}</h5>
                            </div>
                        </div>
                    </div>
                    <div class="appointment-action">
                        <a href="/view-profile.html?id=${pr.id}" class="btn btn-sm bg-info-light" 
                           >
                            <i class="far fa-eye"></i> View
                        </a>
                        <a href="javascript:void(0);" class="btn btn-sm bg-success-light">
                            <i class="fas fa-check"></i> Message
                        </a>

                    </div>
                </div>
                <!-- /Appointment List -->
            `;
        }
        console.log(result)
    })
    .catch(error => console.error(error));
}

getUserData();

searchProfile();
