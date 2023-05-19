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