interests = new Set()
names = new Set()
roles = new Set()
departaments = new Set();

searching = new Set();

last_response = null;

$(document).ready(function() {
    getNames();
    getRoles();
    getInterests();
    getDepartaments();
    $("#cross_info").click(function() {
        $("#person_info").css({
            display: "none"
        });
    });
    $("#toMyCab").click(function() {
        window.location.href = "index.html";
    });
    $("#make_search_btn").click(async function() {
        requestIng = "http://127.0.0.1:5000/find_users_by_name?key=" + generateSearchRequest("names");
        let request = await fetch(requestIng);
        let responseNames = await request.json();
        let names_set = toSet(responseNames.data, responseNames.count);

        requestIng = "http://127.0.0.1:5000/find_users_by_roles?key=" + generateSearchRequest("roles");
        request = await fetch(requestIng);
        let responseRoles = await request.json();
        let roles_set = toSet(responseRoles.data, responseRoles.count);

        requestIng = "http://127.0.0.1:5000/find_users_by_interests?key=" + generateSearchRequest("interests");
        request = await fetch(requestIng);
        let responseInterests = await request.json();
        let interests_set = toSet(responseInterests.data, responseInterests.count);

        requestIng = "http://127.0.0.1:5000/find_users_by_departament?key=" + generateSearchRequest("departament");
        request = await fetch(requestIng);
        let responseDepartaments = await request.json();
        let departaments_set = toSet(responseDepartaments.data, responseDepartaments.count);

        let all_resp = [names_set, roles_set, interests_set, departaments_set];
        interest_length = 100000000;
        interestind_id = 0;
        for (let i = 0; i < all_resp.length; i++) {
            if (interest_length > all_resp[i].length) {
                interestind_id = i;
                interest_length = all_resp[i].length;
            }
        }

        let finish_answer = new Set();
        for (let i = 0; i < all_resp[interestind_id].length; i++) {
            object_f = all_resp[interestind_id][i];
            if (comparePar(object_f)) {
                finish_answer.add(object_f);
            }
        }

        finish_answer = Array.from(finish_answer);
        last_response = finish_answer;

        $("#finded_fields").empty();

        for (let i = 0; i < finish_answer.length; i++) {
            new_person = "<div class='person_block finded' id='" + i + "'></div>";
            new_photo = "<div class='finded_photo finded'></div>";
            $("#finded_fields").append(new_person);
            last_person = $(".person_block")[$(".person_block").length - 1];
            $(last_person).append(new_photo);
            $($(".finded_photo")[$(".finded_photo").length - 1]).css({
                "background-image": "url('" + finish_answer[i].photo + "')"
            });
            new_find_block = "<div class='finded_block finded'></div>";
            $(last_person).append(new_find_block);
            new_el = $(".finded_block")[$(".finded_block").length - 1];
            createText(finish_answer[i], new_el);
        }
    });
    $("#fast_search_button").click(function() {
        search_activated();
    });
    $("#logo_main").click(function() {
        window.location.href = "https://samokat.tech/"
    });
});

function addToRoles(par) {
    return roles.has(par);
}

async function getNames() {
    requestIng = "http://127.0.0.1:5000/find_users?key=";
    let request = await fetch(requestIng);
    let response = await request.json();
    for (let i = 0; i < response.count; i++) {
        newNamePar = response.data[i].name.split(" ");
        for (let n = 0; n < newNamePar.length; n++) {
            if (names.has(newNamePar[n]) == false) {
                names.add(newNamePar[n]);
                newCheck = "<div class='check'>" + newNamePar[n] + "</div>";
                $("#names_check").append(newCheck);
            }
        }
    }
}

async function getRoles() {
    requestIng = "http://127.0.0.1:5000/find_users?key=";
    let request = await fetch(requestIng);
    let response = await request.json();
    for (let i = 0; i < response.count; i++) {
        newCheckPar = response.data[i].roles.split(", ");
        for (let n = 0; n < newCheckPar.length; n++) {
            if (roles.has(newCheckPar[n].toLowerCase()) == false) {
                roles.add(newCheckPar[n].toLowerCase());
                newCheck = "<div class='check'>" + newCheckPar[n].toLowerCase() + "</div>";
                $("#roles_check").append(newCheck);
            }
        }
    }
}

async function getInterests() {
    requestIng = "http://127.0.0.1:5000/find_users?key=";
    let request = await fetch(requestIng);
    let response = await request.json();
    for (let i = 0; i < response.count; i++) {
        newCheckPar = response.data[i].interests.split(", ");
        for (let n = 0; n < newCheckPar.length; n++) {
            if (interests.has(newCheckPar[n].toLowerCase()) == false) {
                interests.add(newCheckPar[n].toLowerCase());
                newCheck = "<div class='check'>" + newCheckPar[n].toLowerCase() + "</div>";
                $("#interests_check").append(newCheck);
            }
        }
    }
}

async function getDepartaments() {
    requestIng = "http://127.0.0.1:5000/find_users?key=";
    let request = await fetch(requestIng);
    let response = await request.json();
    for (let i = 0; i < response.count; i++) {
        newCheckPar = response.data[i].departament.split(", ");
        for (let n = 0; n < newCheckPar.length; n++) {
            if (departaments.has(newCheckPar[n]) == false) {
                departaments.add(newCheckPar[n]);
                newCheck = "<div class='check'>" + newCheckPar[n] + "</div>";
                $("#departament_check").append(newCheck);
            }
        }
    }
}

document.addEventListener("click", function(e) {
    if ($(e.target).hasClass("search_tag")) {
        element = $(e.target).text() + "_" + $(e.target).attr("id");
        $(e.target).remove();
        searching.delete(element);
    } else if ($(e.target).hasClass("text_check")) {
        parent = $(e.target)[0].parentNode;
        if ($(parent).hasClass("opened") == false) {
            $(parent).addClass("opened");
        } else {
            $(parent).removeClass("opened");
        }
    } else if ($(e.target).hasClass("check")) {
        myId = $($(e.target)[0].parentNode).attr("id").split("_")[0];
        newtag = "<div class='search_tag' id='" + myId + "'>" + $(e.target).text() + "</div>";
        search_parameter = $(e.target).text() + "_" + myId;
        if (searching.has(search_parameter) == false) {
            $("#searching_field").append(newtag);
            searching.add(search_parameter);
        }
    } else if ($(e.target).hasClass("finded")) {
        elem = e.target;
        while ($(elem).hasClass("person_block") == false) {
            elem = $(elem)[0].parentNode;
        }
        index = parseInt($(elem).attr("id"));
        person = last_response[index];
        $("#prof_photo_info").css({
            "background-image": "url(" + person.photo + ")"
        });
        $("#naming_info").text(person.name);
        $("#email_info").text(person.email);
        $("#phoneNumber_info").text(person.number);
        $("#roles_info").text(person.roles);
        $("#departament_info").text(person.departament);
        $("#interests_info").text(person.interests);
        $("#person_info").css({
            display: "block"
        });
    }
});

document.addEventListener("keydown", function(e) {
    if (e.key == "Enter") {
        if (document.getElementById("fast_search") == document.activeElement) {
            search_activated();
        }
    }
});

function generateSearchRequest(type = "") {
    new_req = "";
    srch_arr = Array.from(searching);
    for (let i = 0; i < srch_arr.length; i++) {
        if (srch_arr[i].split("_")[1] == type) {
            if (new_req.length > 0) {
                new_req += ("," + srch_arr[i].split("_")[0]);
            } else {
                new_req += srch_arr[i].split("_")[0];
            }
        }
    }
    return new_req;
}

function toSet(object, size) {
    mySet = new Set();
    for (let i = 0; i < size; i++) {
        mySet.add(object[i]);
    }
    return Array.from(mySet);
}

function createText(person, element) {
    let name_text = "<div class='text_block finded'>" + person.name + "</div>";
    let roles_text = "<div class='text_block finded'>" + person.roles + "</div>";
    let email_text = "<div class='text_block finded'>" + person.email + "</div>";

    $(element).append(name_text);
    $(element).append(roles_text);
    $(element).append(email_text);
}

function search_activated() {
    new_tag_value = $("#fast_search").val();
    $("#fast_search").val("");
    if (new_tag_value != "") {
        newtag = "<div class='search_tag' id='names'>" + new_tag_value + "</div>";
        search_parameter = new_tag_value + "_names";
        if (searching.has(search_parameter) == false) {
            $("#searching_field").append(newtag);
            searching.add(search_parameter);
        }
    }
}

function comparePar(person) {
    name_flag = false;
    name_tags = 0;

    role_flag = false;
    role_tags = 0;

    departament_flag = false;
    departament_tags = 0;

    interest_flag = false;
    interest_tags = 0;

    srch_pars = Array.from(searching);
    for (let i = 0; i < srch_pars.length; i++) {
        search_type = srch_pars[i].split("_")[1];
        search_param = (srch_pars[i].split("_")[0]).toLowerCase();
        if (search_type == "names") {
            console.log(searching)
            name_tags += 1;
            if (person.name.toLowerCase().includes(search_param)) {
                name_flag = true
            }
        } else if (search_type == "roles") {
            role_tags += 1;
            if (person.roles.toLowerCase().includes(search_param)) {
                role_flag = true
            }
        } else if (search_type == "departaments") {
            departament_tags += 1;
            if (person.departament.toLowerCase().includes(search_param)) {
                departamnet_flag = true
            }
        } else if (search_type == "interests") {
            interest_tags += 1;
            if (person.interests.toLowerCase().includes(search_param)) {
                interest_flag = true
            }
        }
    }
    if (name_tags == 0) {
        name_flag = true
    }
    if (interest_tags == 0) {
        interest_flag = true
    }
    if (departament_tags == 0) {
        departament_flag = true
    }
    if (role_tags == 0) {
        role_flag = true
    }
    console.log(name_tags, interest_tags, departament_tags, role_tags);
    console.log(name_flag, interest_flag, departament_flag, role_flag);
    if (role_flag && name_flag && interest_flag && departament_flag) {
        return true
    }
    return false
}