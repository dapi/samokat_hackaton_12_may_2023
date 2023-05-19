import {
    drawProductsMap
} from "./productsMap.js";
import {
    drawDepartamentMap
} from './departmentMap.js'
import {
    drawSubordinationMap
} from './subordinationMap.js'



let changer_expand = false;

export var map = createMap();
drawDepartamentMap();

function createMap() {
    // Создаем карту Leaflet
    var map = L.map('map').setView([51.505, 7], 4);

    map.setMinZoom(4);
    map.setMaxZoom(13);

    // Создаем пустой слой
    var emptyLayer = L.tileLayer('', {
        attribution: 'Empty Map'
    }).addTo(map);
    $(document.getElementsByClassName("leaflet-control-attribution leaflet-control")).remove();
    return map
}

document.addEventListener("click", function(e) {
    console.log(e);
    if ($(e.target).hasClass("custom-cluster-icon")) {
        console.log('Нажатие на иконку:', e.target);
    } else if ($(e.target).hasClass("teamCircle")) {
        console.log('Нажатие на иконку:', e.target);

    } else if ($(e.target).hasClass("cityCircle")) {
        console.log('Нажатие на иконку:', e.target);
    }
    let el = e.target;
    if ($(el).attr("id") == "toMyCab") {
        console.log("ggg");
        window.location.href = "../index.html";
    }
    if ($(el).hasClass("inText")) {
        console.log(changer_expand);
        if (changer_expand) {
            changer_expand = false;
            $("#map_changer").css({
                "height": "7vh"
            })
        } else {
            changer_expand = true;
            $("#map_changer").css({
                "height": "30vh"
            })
        }

        if ($(el).attr("id") == "departaments") {
            map.remove()
            map = createMap();
            drawDepartamentMap();
        } else if ($(el).attr("id") == "products") {
            map.remove()
            map = createMap();
            drawProductsMap();
        } else if ($(el).attr("id") == "chldren") {
            map.remove()
            map = createMap();
            drawSubordinationMap();
        }
    }

});