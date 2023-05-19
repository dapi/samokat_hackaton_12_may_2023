function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
            }
        }
    }
    return cookieValue;
}
function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

if(getCookie('csrftoken') == null){
    fetch('http://localhost:8000/api/cookie/csrf/')
        .then((response) => response.json())
        .then(data => {
            createCookie("csrftoken", data.csrf_token, 1)
        }
    )
}


document.getElementById('login_form').addEventListener('submit', function(e) {
    e.preventDefault();
    let form = document.getElementById('login_form');
    fetch('http://localhost:8000/api/user/login/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify({
            "username" : e.target.username.value,
            "password" : e.target.password.value
        })
    })
    .then((response) => response.json())
    .then((result) => {
        localStorage.setItem('token', result.token);
        window.location.href = "home.html";
    })
    .catch(error => console.error(error));
    form.reset()
}, true);

// aa@dd.bbbg