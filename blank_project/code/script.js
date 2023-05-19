current_month = 5 //брать из бд
months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
month_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
last_response = null
global_days_info = []

$(document).ready(function() {
    prof_element = $("#profile");
    prof_width = parseFloat(prof_element.width());
    prof_height = parseFloat(prof_element.height());

    days_view();

    $("#nickname").css({
        padding: 0.03 * prof_width,
    });

    phone_width = $("#phone").width();
    phone_height = $("#phone").height();

    $("#changePhoneButton").css({
        padding: 0.03 * phone_width,
        height: phone_height - 0.06 * phone_width
    });
    $("#phoneNumber").css({
        padding: 0.03 * phone_width,
        height: phone_height - 0.06 * phone_width
    });

    $("#toExpandedSearch").click(function() {
        window.location.href = "expandedSearchPage.html"
    });
    $("#toMyCab").click(function() {
        window.location.href = "index.html"
    });
    $("#toMap").click(function() {
        window.location.href = "map/mapPage.html"
    });
    $("#fast_search_button").click(async function() {
        search_activated();
    });
    $("#cross_info").click(function() {
        $("#person_info").css({
            display: "none"
        });
    });
    $("#next_month").click(function() {
        current_month += 1
        if (current_month >= 12) {
            current_month = 0
        }
        days_view();
    });
    $("#previous_month").click(function() {
        current_month -= 1
        if (current_month < 0) {
            current_month = 11
        }
        days_view();
    });
    $("#logo_main").click(function() {
        window.location.href = "https://samokat.tech/"
    });
});

document.addEventListener("click", async function(e) {
    if ($(e.target).hasClass("dropdown_field")) {
        id = parseInt($(e.target).attr("id").split("_")[1])
        person = last_response.data[id]
        $("#prof_photo_info").css({
            "background-image": "url(" + person.photo + ")"
        });
        console.log(person)
        $("#naming_info").text(person.name)
        $("#email_info").text(person.email)
        $("#phoneNumber_info").text(person.number)
        $("#roles_info").text(person.roles)
        $("#departament_info").text(person.departament)
        $("#interests_info").text(person.interests)
        $("#person_info").css({
            display: "block"
        });
    } else if ($(e.target).hasClass("day")) {
        day = e.target;
        id = parseInt($(day).attr("id").split("_")[1]);
        deadline = parseInt($(day).attr("id").split("_")[2]);
        //взять из бд
        $("#task_day").text(normalize_data(id));
        $("#task_name").text("имя таска на день: " + id);
        $("#task_description").text(global_days_info[id - 1].task);
        $("#task_deadline").text(deadline);
        $("#task_faster").text("");
        text_last = "Это последний день выполнения!";
        if ($(day).hasClass("deadline")) {
            for (let k = 0; k < text_last.length; k++) {
                setTimeout(() => {
                    $("#task_faster").text($("#task_faster").text() + text_last[k]);
                }, 15 * k);
            }
        }
    }
});

document.addEventListener("mousemove", function(e) {
    if ($("#form_search").is(":hover") == false &&
        $("#dropdown_list").is("hover") == false) {
        $("#dropdown_list").css({
            "max-height": 0
        });
    } else {
        $("#dropdown_list").css({
            "max-height": "40vh"
        });
    }
});

document.addEventListener("keydown", function(e) {
    if (e.key == "Enter") {
        console.log("e")
        if (document.getElementById("fast_search") == document.activeElement) {
            search_activated();
        }
    }
});

async function search_activated() {
    user_input = $("#fast_search").val()
    requestIng = "http://127.0.0.1:5000/find_users?key=" + user_input
    let request = await fetch(requestIng)
    let response = await request.json();
    console.log(response)
    last_response = response
    $("#dropdown_list").empty()
    for (let i = 0; i < response.count; i++) {
        new_element = "<div class='dropdown_field' id='profile_" + i + "'>" + response.data[i].name + "</div>"
        $("#dropdown_list").append(new_element);
    }
}

function generate_day_info(days_n) {

    return array
}

async function days_view() {
    $("#cal_days").empty();
    $("#month_name").text(months[current_month])

    global_days_info = [];
    days_n = month_days[current_month];
    let i = 0;
    while (i < days_n) {
        requestIng = "http://127.0.0.1:5000/generate_text";
        let request = await fetch(requestIng);
        let response = await request.json();
        let task_text = response.text;
        let newDay = {
            number: i + 1,
            deadline: Math.min(i + parseInt(Math.floor(Math.random() * 5)) + 3, days_n),
            task: task_text
        }
        global_days_info.push(newDay)
        i++
        for (let k = i; k < newDay.deadline; k++) {
            newDay_s = {
                number: k + 1,
                deadline: newDay.deadline,
                task: task_text
            }
            global_days_info.push(newDay_s)
        }
        i = newDay.deadline
    }

    console.log(global_days_info)
    for (let i = 0; i < global_days_info.length; i++) {
        new_day = "<div class='day' id='day_" + global_days_info[i].number + "_" + global_days_info[i].deadline + "'>" + global_days_info[i].number + "</div>"

        $("#cal_days").append(new_day);
        if (global_days_info[i].deadline == global_days_info[i].number) {
            $($(".day")[$(".day").length - 1]).addClass("deadline");
        }
    }
}

function normalize_data(day) {
    month_now = (current_month + 1).toString();
    if (month_now.length == 1) {
        month_now = "0" + month_now
    }
    day = day.toString();
    if (day.length == 1) {
        day = "0" + day
    }
    return month_now + "." + day
}