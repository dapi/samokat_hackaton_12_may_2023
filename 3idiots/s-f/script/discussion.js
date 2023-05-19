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

function searchQusetion(){
    let k = "";
    if (document.getElementById("k").value != ''){
        k = document.getElementById("k").value;
    }
    fetch('http://localhost:8000/api/knowledge/search/?k='+k, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization' : 'Token ' + token
        }
        
    })
    .then((response) => response.json())
    .then((result) => {
        document.getElementById("search_result_area").innerHTML = '';
        for(let i=0; i<result.questions.length; i++){
            const pr = result.questions[i];
            document.getElementById("search_result_area").innerHTML += `
                <div class="appointment-list py-3" >
                    <div class="profile-info-widget" style="background-color : ##cde1f3; padding : 8px; border 1px solid;">
                        <div class="profile-det-info">
                            <h3><a href="/view-question.html?id=${pr.id}"> ${pr.question} </a></h3>
                        </div>
                    </div>
                    <div class="appointment-action">
                        <a href="/view-question.html?id=${pr.id}" class="btn btn-sm bg-info-light">
                            <i class="far fa-eye"></i> View/Answer
                        </a>

                    </div>
                </div>

            `;
        }
        console.log(result)
    })
    .catch(error => console.error(error));
}

getUserData();

searchQusetion();
