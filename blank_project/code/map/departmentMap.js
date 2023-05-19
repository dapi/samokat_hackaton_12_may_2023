import { map } from "./map.js";

export function drawDepartamentMap(){
    // Удаление всех маркеров с карты
map.eachLayer(function (layer) {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });
  
  // Удаление всех полигонов с карты
  map.eachLayer(function (layer) {
    if (layer instanceof L.Polygon) {
      map.removeLayer(layer);
    }
  });
  
  // Очистка всплывающих подсказок
  map.closePopup();
  
  // Очистка нарисованных рисунков
  map.eachLayer(function (layer) {
    if (layer instanceof L.LayerGroup && layer.getLayers().length === 0) {
      map.removeLayer(layer);
    }
  });
  


// Создаем кастомную иконку для кластеров
var clusterIcon = L.divIcon({
    html: '<div class="cluster-icon"></div>',
    className: 'custom-cluster-icon',
    iconSize: [20, 20]
});

// Создаем группу кластеров с настроенной иконкой
var markerClusterGroup = L.markerClusterGroup({
    maxClusterRadius: 50,
    iconCreateFunction: function(cluster) {
        var childCount = cluster.getChildCount();
        var iconSize = [40, 40];
        var className = 'custom-cluster-icon';

        return L.divIcon({
            html: '<div class="' + className + '"></div>',
            className: className,
            iconSize: iconSize
        });
    }
});

var initialIconSize = [20, 20];
var customIcon = L.icon({
    iconUrl: './assets/maxresdefault.jpg',
    iconSize: initialIconSize,
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
    className: 'custom-marker-icon'
})



// Добавляем маркеры в группу кластеров
var marker1 = L.marker([51.25, -0.5], {
    icon: customIcon
});
var marker2 = L.marker([51.4, -0.63], {
    icon: customIcon
});
var marker3 = L.marker([51.56, -0.68], {
    icon: customIcon
});
var marker4 = L.marker([51.593, -0.3], {
    icon: customIcon
});
var marker5 = L.marker([51.95, -0.34], {
    icon: customIcon
});
var marker6 = L.marker([51.762, 0.03], {
    icon: customIcon
});
var marker7 = L.marker([51.87, 0.3], {
    icon: customIcon
});
var marker8 = L.marker([51.7, 0.4], {
    icon: customIcon
});
var marker9 = L.marker([51.3, 0.4], {
    icon: customIcon
});
var marker = L.marker([51.2, -0.06], {
    icon: customIcon
});

// Создание круга с центром в координатах [широта, долгота]
var circleTeam1 = L.circle([51.51, 0], {
    radius: 4000, // радиус круга в метрах
    color: '#e32e56', // цвет границы круга
    fillColor: '#ff335f', // цвет заливки круга
    fillOpacity: 1, // прозрачность заливки круга (от 0 до 1)
    className: 'teamCircle'
}).addTo(map);

var polyline1 = L.polyline([circleTeam1.getLatLng(), marker1.getLatLng(), circleTeam1.getLatLng(),  marker2.getLatLng(), circleTeam1.getLatLng(),  marker3.getLatLng(), circleTeam1.getLatLng(), marker4.getLatLng(), circleTeam1.getLatLng(), marker5.getLatLng(), circleTeam1.getLatLng()], { color: '#f7edbd' }).addTo(map);
var polyline2 = L.polyline([circleTeam1.getLatLng(), marker6.getLatLng(), circleTeam1.getLatLng(),  marker7.getLatLng(), circleTeam1.getLatLng(),  marker8.getLatLng(), circleTeam1.getLatLng(), marker9.getLatLng(), circleTeam1.getLatLng(), marker.getLatLng(), circleTeam1.getLatLng()], { color: '#f7edbd' }).addTo(map);
polyline1.bringToBack();
polyline2.bringToBack();
// var polylinez = L.polyline([ marker1.getLatLng(),  marker2.getLatLng(),  marker3.getLatLng(), marker4.getLatLng(), marker5.getLatLng()], { color: '#1e1e1e79' }).addTo(map);
markerClusterGroup.addLayer(marker);
markerClusterGroup.addLayer(marker1);
markerClusterGroup.addLayer(marker2);
markerClusterGroup.addLayer(marker3);
markerClusterGroup.addLayer(marker4);
markerClusterGroup.addLayer(marker5);
markerClusterGroup.addLayer(marker6);
markerClusterGroup.addLayer(marker7);
markerClusterGroup.addLayer(marker8);
markerClusterGroup.addLayer(marker9);

// Добавляем группу кластеров на карту
map.addLayer(markerClusterGroup);






  
  // Создаем группу кластеров с настроенной иконкой
var markerClusterGroup0 = L.markerClusterGroup({
    maxClusterRadius: 50,
    iconCreateFunction: function(cluster) {
        var iconSize = [40, 40];
        var className = 'custom-cluster-icon';

        return L.divIcon({
            html: '<div class="' + className + '"></div>',
            className: className,
            iconSize: iconSize
        });
    }
});


// Добавляем маркеры в группу кластеров
var marker10 = L.marker([52.25, 0.5], {
    icon: customIcon
});
var marker20 = L.marker([52.4, 1.03], {
    icon: customIcon
});
var marker30 = L.marker([52.56, 0.68], {
    icon: customIcon
});
var marker40 = L.marker([52.993, 0.4], {
    icon: customIcon
});
var marker50 = L.marker([52.95, 0.94], {
    icon: customIcon
});
var marker60 = L.marker([52.762, 1.03], {
    icon: customIcon
});
var marker70 = L.marker([52.87, 1.3], {
    icon: customIcon
});
var marker80 = L.marker([52.7, 1.4], {
    icon: customIcon
});
var marker90 = L.marker([52.3, 1.4], {
    icon: customIcon
});
var marker0 = L.marker([52.2, 1.06], {
    icon: customIcon
});

// Создание круга с центром в координатах [широта, долгота]
var circleTeam10 = L.circle([52.51, 1], {
    radius: 4000, // радиус круга в метрах
    color: '#e32e56', // цвет границы круга
    fillColor: '#ff335f', // цвет заливки круга
    fillOpacity: 1, // прозрачность заливки круга (от 0 до 1)
    className: 'teamCircle'
}).addTo(map);

var polyline10 = L.polyline([circleTeam10.getLatLng(), marker10.getLatLng(), circleTeam10.getLatLng(),  marker20.getLatLng(), circleTeam10.getLatLng(),  marker30.getLatLng(), circleTeam10.getLatLng(), marker40.getLatLng(), circleTeam10.getLatLng(), marker50.getLatLng(), circleTeam10.getLatLng()], { color: '#f7edbd' }).addTo(map);
var polyline20 = L.polyline([circleTeam10.getLatLng(), marker60.getLatLng(), circleTeam10.getLatLng(),  marker70.getLatLng(), circleTeam10.getLatLng(),  marker80.getLatLng(), circleTeam10.getLatLng(), marker90.getLatLng(), circleTeam10.getLatLng(), marker0.getLatLng(), circleTeam10.getLatLng()], { color: '#f7edbd' }).addTo(map);
polyline10.bringToBack();
polyline20.bringToBack();

markerClusterGroup0.addLayer(marker0);
markerClusterGroup0.addLayer(marker10);
markerClusterGroup0.addLayer(marker20);
markerClusterGroup0.addLayer(marker30);
markerClusterGroup0.addLayer(marker40);
markerClusterGroup0.addLayer(marker50);
markerClusterGroup0.addLayer(marker60);
markerClusterGroup0.addLayer(marker70);
markerClusterGroup0.addLayer(marker80);
markerClusterGroup0.addLayer(marker90);

// Добавляем группу кластеров на карту
map.addLayer(markerClusterGroup0);

  // Создаем маркер с DivIcon
  var text = L.marker([51.35, -1], { icon: createIconWithText('') });
  var text0 = L.marker([52.35, 0], { icon: createIconWithText('') });
  var text3 = L.marker([49.95, -1], { icon: createIconWithText('') });
  var text4 = L.marker([49.95, 2], { icon: createIconWithText('') });
  var text5 = L.marker([51.55, 3], { icon: createIconWithText('') });

  // Добавляем маркер на карту
  map.addLayer(text0);
  map.addLayer(text);
  map.addLayer(text3);
  map.addLayer(text4);
  map.addLayer(text5);








// Создание круга с центром в координатах [широта, долгота]
var cityCircle1 = L.circle([51.51, 1.5], {
    radius: 25000, // радиус круга в метрах
    color: '#d51e46', // цвет границы круга
    fillColor: '#d51e46', // цвет заливки круга
    fillOpacity: 1, // Возможность кликать по метке
    className: 'cityCircle'
}).addTo(map);

// Добавление всплывающей подсказки с текстом внутрь круга
cityCircle1.bindTooltip("Moscow", {
    permanent: true, // Постоянная подсказка
    direction: 'center', // Выравнивание текста по центру
    className: 'circle-tooltip' // CSS-класс для стилизации подсказки
});














// Создаем группу кластеров с настроенной иконкой
var markerClusterGroup1 = L.markerClusterGroup({
    maxClusterRadius: 50,
    iconCreateFunction: function(cluster) {
        var childCount = cluster.getChildCount();
        var iconSize = [40, 40];
        var className = 'custom-cluster-icon';

        return L.divIcon({
            html: '<div class="' + className + '"></div>',
            className: className,
            iconSize: iconSize
        });
    }
});




// Добавляем маркеры в группу кластеров
var marker11 = L.marker([50.85, -0.5], {
    icon: customIcon
});
var marker21 = L.marker([50.0, -0.63], {
    icon: customIcon
});
var marker31 = L.marker([50.16, -0.68], {
    icon: customIcon
});
var marker41 = L.marker([50.193, -0.3], {
    icon: customIcon
});
var marker51 = L.marker([50.55, -0.34], {
    icon: customIcon
});
var marker61 = L.marker([50.362, 0.03], {
    icon: customIcon
});
var marker71 = L.marker([50.47, 0.3], {
    icon: customIcon
});
var marker81 = L.marker([50.3, 0.4], {
    icon: customIcon
});
var marker91 = L.marker([49.9, 0.4], {
    icon: customIcon
});
var marker101 = L.marker([49.7, -0.06], {
    icon: customIcon
});

// Создание круга с центром в координатах [широта, долгота]
var circleTeam11 = L.circle([50.11, 0], {
    radius: 4000, // радиус круга в метрах
    color: '#e32e56', // цвет границы круга
    fillColor: '#ff335f', // цвет заливки круга
    fillOpacity: 1, // прозрачность заливки круга (от 0 до 1)
    className: 'teamCircle'
}).addTo(map);

var polyline11 = L.polyline([circleTeam11.getLatLng(), marker11.getLatLng(), circleTeam11.getLatLng(),  marker21.getLatLng(), circleTeam11.getLatLng(),  marker31.getLatLng(), circleTeam11.getLatLng(), marker41.getLatLng(), circleTeam11.getLatLng(), marker51.getLatLng(), circleTeam11.getLatLng()], { color: '#f7edbd' }).addTo(map);
var polyline21 = L.polyline([circleTeam11.getLatLng(), marker61.getLatLng(), circleTeam11.getLatLng(),  marker71.getLatLng(), circleTeam11.getLatLng(),  marker81.getLatLng(), circleTeam11.getLatLng(), marker91.getLatLng(), circleTeam11.getLatLng(), marker101.getLatLng(), circleTeam11.getLatLng()], { color: '#f7edbd' }).addTo(map);
polyline11.bringToBack();
polyline21.bringToBack();
// var polylinez = L.polyline([ marker1.getLatLng(),  marker2.getLatLng(),  marker3.getLatLng(), marker4.getLatLng(), marker5.getLatLng()], { color: '#1e1e1e79' }).addTo(map);
markerClusterGroup1.addLayer(marker101);
markerClusterGroup1.addLayer(marker11);
markerClusterGroup1.addLayer(marker21);
markerClusterGroup1.addLayer(marker31);
markerClusterGroup1.addLayer(marker41);
markerClusterGroup1.addLayer(marker51);
markerClusterGroup1.addLayer(marker61);
markerClusterGroup1.addLayer(marker71);
markerClusterGroup1.addLayer(marker81);
markerClusterGroup1.addLayer(marker91);

// Добавляем группу кластеров на карту
map.addLayer(markerClusterGroup1);













var newCustomIcon = L.icon({
    iconUrl: './assets/maxresdefault.jpg',
    iconSize: initialIconSize,
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
    className: 'custom-marker-icon'
})

// Создаем группу кластеров с настроенной иконкой
var markerClusterGroup2 = L.markerClusterGroup({
    maxClusterRadius: 50,
    iconCreateFunction: function(cluster) {
        var childCount = cluster.getChildCount();
        var iconSize = [40, 40];
        var className = 'custom-cluster-icon';

        return L.divIcon({
            html: '<div class="' + className + '"></div>',
            className: className,
            iconSize: iconSize
        });
    }
});




// Добавляем маркеры в группу кластеров
var marker12 = L.marker([50.85, 1.5], {
    icon: newCustomIcon
});
var marker22 = L.marker([50.0, 2.63], {
    icon: newCustomIcon
});
var marker32 = L.marker([50.16, 1.68], {
    icon: newCustomIcon
});
var marker42 = L.marker([50.193, 2.3], {
    icon: newCustomIcon
});
var marker52 = L.marker([50.55, 1.34], {
    icon: newCustomIcon
});
var marker62 = L.marker([50.362, 2.03], {
    icon: newCustomIcon
});
var marker72 = L.marker([50.47, 2.3], {
    icon: newCustomIcon
});
var marker82 = L.marker([50.3, 2.4], {
    icon: newCustomIcon
});
var marker92 = L.marker([49.9, 2.4], {
    icon: newCustomIcon
});
var marker202 = L.marker([49.7, 1.06], {
    icon: newCustomIcon
});

// Создание круга с центром в координатах [широта, долгота]
var circleTeam12 = L.circle([50.11, 2], {
    radius: 4000, // радиус круга в метрах
    color: '#e32e56', // цвет границы круга
    fillColor: '#ff335f', // цвет заливки круга
    fillOpacity: 1, // прозрачность заливки круга (от 0 до 1)
    className: 'teamCircle'
}).addTo(map);

var polyline12 = L.polyline([circleTeam12.getLatLng(), marker12.getLatLng(), circleTeam12.getLatLng(),  marker22.getLatLng(), circleTeam12.getLatLng(),  marker32.getLatLng(), circleTeam12.getLatLng(), marker42.getLatLng(), circleTeam12.getLatLng(), marker52.getLatLng(), circleTeam12.getLatLng()], { color: '#f7edbd' }).addTo(map);
var polyline22 = L.polyline([circleTeam12.getLatLng(), marker62.getLatLng(), circleTeam12.getLatLng(),  marker72.getLatLng(), circleTeam12.getLatLng(),  marker82.getLatLng(), circleTeam12.getLatLng(), marker92.getLatLng(), circleTeam12.getLatLng(), marker202.getLatLng(), circleTeam12.getLatLng()], { color: '#f7edbd' }).addTo(map);
polyline12.bringToBack();
polyline22.bringToBack();
// var polylinez = L.polyline([ marker1.getLatLng(),  marker2.getLatLng(),  marker3.getLatLng(), marker4.getLatLng(), marker5.getLatLng()], { color: '#1e1e1e79' }).addTo(map);
markerClusterGroup2.addLayer(marker202);
markerClusterGroup2.addLayer(marker12);
markerClusterGroup2.addLayer(marker22);
markerClusterGroup2.addLayer(marker32);
markerClusterGroup2.addLayer(marker42);
markerClusterGroup2.addLayer(marker52);
markerClusterGroup2.addLayer(marker62);
markerClusterGroup2.addLayer(marker72);
markerClusterGroup2.addLayer(marker82);
markerClusterGroup2.addLayer(marker92);

// Добавляем группу кластеров на карту
map.addLayer(markerClusterGroup2);
  




















// Создаем группу кластеров с настроенной иконкой
var markerClusterGroup3 = L.markerClusterGroup({
    maxClusterRadius: 50,
    iconCreateFunction: function(cluster) {
        var childCount = cluster.getChildCount();
        var iconSize = [40, 40];
        var className = 'custom-cluster-icon';

        return L.divIcon({
            html: '<div class="' + className + '"></div>',
            className: className,
            iconSize: iconSize
        });
    }
});




// Добавляем маркеры в группу кластеров
var marker13 = L.marker([52.85, 3.5], {
    icon: newCustomIcon
});
var marker23 = L.marker([52.0, 4.93], {
    icon: newCustomIcon
});
var marker33 = L.marker([52.10, 4.38], {
    icon: newCustomIcon
});
var marker43 = L.marker([52.110, 3.3], {
    icon: newCustomIcon
});
var marker53 = L.marker([52.50, 3.84], {
    icon: newCustomIcon
});
var marker63 = L.marker([52.310, 4.53], {
    icon: newCustomIcon
});
var marker73 = L.marker([52.4, 3.3], {
    icon: newCustomIcon
});
var marker83 = L.marker([51.7, 4.4], {
    icon: newCustomIcon
});
var marker93 = L.marker([51.9, 3], {
    icon: newCustomIcon
});
var marker303 = L.marker([51.7, 3.56], {
    icon: newCustomIcon
});

// Создание круга с центром в координатах [широта, долгота]
var circleTeam13 = L.circle([52.11, 4], {
    radius: 4000, // радиус круга в метрах
    color: '#e32e56', // цвет границы круга
    fillColor: '#ff335f', // цвет заливки круга
    fillOpacity: 1, // прозрачность заливки круга (от 0 до 1)
    className: 'teamCircle'
}).addTo(map);

var polyline13 = L.polyline([circleTeam13.getLatLng(), marker13.getLatLng(), circleTeam13.getLatLng(),  marker23.getLatLng(), circleTeam13.getLatLng(),  marker33.getLatLng(), circleTeam13.getLatLng(), marker43.getLatLng(), circleTeam13.getLatLng(), marker53.getLatLng(), circleTeam13.getLatLng()], { color: '#f7edbd' }).addTo(map);
var polyline23 = L.polyline([circleTeam13.getLatLng(), marker63.getLatLng(), circleTeam13.getLatLng(),  marker73.getLatLng(), circleTeam13.getLatLng(),  marker83.getLatLng(), circleTeam13.getLatLng(), marker93.getLatLng(), circleTeam13.getLatLng(), marker303.getLatLng(), circleTeam13.getLatLng()], { color: '#f7edbd' }).addTo(map);
polyline13.bringToBack();
polyline23.bringToBack();
// var polylinez = L.polyline([ marker1.getLatLng(),  marker2.getLatLng(),  marker3.getLatLng(), marker4.getLatLng(), marker5.getLatLng()], { color: '#1e1e1e79' }).addTo(map);
markerClusterGroup3.addLayer(marker303);
markerClusterGroup3.addLayer(marker13);
markerClusterGroup3.addLayer(marker23);
markerClusterGroup3.addLayer(marker33);
markerClusterGroup3.addLayer(marker43);
markerClusterGroup3.addLayer(marker53);
markerClusterGroup3.addLayer(marker63);
markerClusterGroup3.addLayer(marker73);
markerClusterGroup3.addLayer(marker83);
markerClusterGroup3.addLayer(marker93);

// Добавляем группу кластеров на карту
map.addLayer(markerClusterGroup3);
  





var polylineCityTeam = L.polyline([cityCircle1.getLatLng(), circleTeam1.getLatLng(), cityCircle1.getLatLng(), circleTeam10.getLatLng(), cityCircle1.getLatLng(), circleTeam11.getLatLng(), cityCircle1.getLatLng(),  circleTeam12.getLatLng(), cityCircle1.getLatLng(),  circleTeam13.getLatLng(), cityCircle1.getLatLng()], { color: '#dda187', weight: 7 }).addTo(map);
polylineCityTeam.bringToBack();

































// Создаем группу кластеров с настроенной иконкой
var markerClusterGroupWeb = L.markerClusterGroup({
    maxClusterRadius: 50,
    iconCreateFunction: function(cluster) {
        var childCount = cluster.getChildCount();
        var iconSize = [40, 40];
        var className = 'custom-cluster-icon';

        return L.divIcon({
            html: '<div class="' + className + '"></div>',
            className: className,
            iconSize: iconSize
        });
    }
});



// Добавляем маркеры в группу кластеров
var markerWeb1 = L.marker([51.25+ 5, -0.5+10], {
    icon: customIcon
});
var markerWeb2 = L.marker([51.4+5, -0.63+10], {
    icon: customIcon
});
var markerWeb3 = L.marker([51.56+5, -0.68+10], {
    icon: customIcon
});
var markerWeb4 = L.marker([51.593+5, -0.3+10], {
    icon: customIcon
});
var markerWeb5 = L.marker([51.95+5, -0.34+10], {
    icon: customIcon
});
var markerWeb6 = L.marker([51.762+5, 0.03+10], {
    icon: customIcon
});
var markerWeb7 = L.marker([51.87+5, 0.3+10], {
    icon: customIcon
});
var markerWeb8 = L.marker([51.7+5, 0.4+10], {
    icon: customIcon
});
var markerWeb9 = L.marker([51.3+5, 0.4+10], {
    icon: customIcon
});
var markerWeb = L.marker([51.2+5, -0.06+10], {
    icon: customIcon
});

// Создание круга с центром в координатах [широта, долгота]
var circleTeamWeb1 = L.circle([51.51+5, 0+10], {
    radius: 4000, // радиус круга в метрах
    color: '#e32e56', // цвет границы круга
    fillColor: '#ff335f', // цвет заливки круга
    fillOpacity: 1, // прозрачность заливки круга (от 0 до 1)
    className: 'teamCircle'
}).addTo(map);

var polylineWeb1 = L.polyline([circleTeamWeb1.getLatLng(), markerWeb1.getLatLng(), circleTeamWeb1.getLatLng(),  markerWeb2.getLatLng(), circleTeamWeb1.getLatLng(),  markerWeb3.getLatLng(), circleTeamWeb1.getLatLng(), markerWeb4.getLatLng(), circleTeamWeb1.getLatLng(), markerWeb5.getLatLng(), circleTeamWeb1.getLatLng()], { color: '#f7edbd' }).addTo(map);
var polylineWeb2 = L.polyline([circleTeamWeb1.getLatLng(), markerWeb6.getLatLng(), circleTeamWeb1.getLatLng(),  markerWeb7.getLatLng(), circleTeamWeb1.getLatLng(),  markerWeb8.getLatLng(), circleTeamWeb1.getLatLng(), markerWeb9.getLatLng(), circleTeamWeb1.getLatLng(), markerWeb.getLatLng(), circleTeamWeb1.getLatLng()], { color: '#f7edbd' }).addTo(map);
polylineWeb1.bringToBack();
polylineWeb2.bringToBack();
// var polylinez = L.polyline([ marker1.getLatLng(),  marker2.getLatLng(),  marker3.getLatLng(), marker4.getLatLng(), marker5.getLatLng()], { color: '#1e1e1e79' }).addTo(map);
markerClusterGroupWeb.addLayer(markerWeb);
markerClusterGroupWeb.addLayer(markerWeb1);
markerClusterGroupWeb.addLayer(markerWeb2);
markerClusterGroupWeb.addLayer(markerWeb3);
markerClusterGroupWeb.addLayer(markerWeb4);
markerClusterGroupWeb.addLayer(markerWeb5);
markerClusterGroupWeb.addLayer(markerWeb6);
markerClusterGroupWeb.addLayer(markerWeb7);
markerClusterGroupWeb.addLayer(markerWeb8);
markerClusterGroupWeb.addLayer(markerWeb9);

// Добавляем группу кластеров на карту
map.addLayer(markerClusterGroupWeb);






  
  // Создаем группу кластеров с настроенной иконкой
var markerClusterGroupWeb0 = L.markerClusterGroup({
    maxClusterRadius: 50,
    iconCreateFunction: function(cluster) {
        var iconSize = [40, 40];
        var className = 'custom-cluster-icon';

        return L.divIcon({
            html: '<div class="' + className + '"></div>',
            className: className,
            iconSize: iconSize
        });
    }
});


// Добавляем маркеры в группу кластеров
var markerWeb10 = L.marker([52.25+5, 0.5+10], {
    icon: customIcon
});
var markerWeb20 = L.marker([52.4+5, 1.03+10], {
    icon: customIcon
});
var markerWeb30 = L.marker([52.56+5, 0.68+10], {
    icon: customIcon
});
var markerWeb40 = L.marker([52.993+5, 0.4+10], {
    icon: customIcon
});
var markerWeb50 = L.marker([52.95+5, 0.94+10], {
    icon: customIcon
});
var markerWeb60 = L.marker([52.762+5, 1.03+10], {
    icon: customIcon
});
var markerWeb70 = L.marker([52.87+5, 1.3+10], {
    icon: customIcon
});
var markerWeb80 = L.marker([52.7+5, 1.4+10], {
    icon: customIcon
});
var markerWeb90 = L.marker([52.3+5, 1.4+10], {
    icon: customIcon
});
var markerWeb0 = L.marker([52.2+5, 1.06+10], {
    icon: customIcon
});

// Создание круга с центром в координатах [широта, долгота]
var circleTeamWeb10 = L.circle([52.51+5, 1+10], {
    radius: 4000, // радиус круга в метрах
    color: '#e32e56', // цвет границы круга
    fillColor: '#ff335f', // цвет заливки круга
    fillOpacity: 1, // прозрачность заливки круга (от 0 до 1)
    className: 'teamCircle'
}).addTo(map);

var polylineWeb10 = L.polyline([circleTeamWeb10.getLatLng(), markerWeb10.getLatLng(), circleTeamWeb10.getLatLng(),  markerWeb20.getLatLng(), circleTeamWeb10.getLatLng(),  markerWeb30.getLatLng(), circleTeamWeb10.getLatLng(), markerWeb40.getLatLng(), circleTeamWeb10.getLatLng(), markerWeb50.getLatLng(), circleTeamWeb10.getLatLng()], { color: '#f7edbd' }).addTo(map);
var polylineWeb20 = L.polyline([circleTeamWeb10.getLatLng(), markerWeb60.getLatLng(), circleTeamWeb10.getLatLng(),  markerWeb70.getLatLng(), circleTeamWeb10.getLatLng(),  markerWeb80.getLatLng(), circleTeamWeb10.getLatLng(), markerWeb90.getLatLng(), circleTeamWeb10.getLatLng(), markerWeb0.getLatLng(), circleTeamWeb10.getLatLng()], { color: '#f7edbd' }).addTo(map);
polylineWeb10.bringToBack();
polylineWeb20.bringToBack();

markerClusterGroupWeb0.addLayer(markerWeb0);
markerClusterGroupWeb0.addLayer(markerWeb10);
markerClusterGroupWeb0.addLayer(markerWeb20);
markerClusterGroupWeb0.addLayer(markerWeb30);
markerClusterGroupWeb0.addLayer(markerWeb40);
markerClusterGroupWeb0.addLayer(markerWeb50);
markerClusterGroupWeb0.addLayer(markerWeb60);
markerClusterGroupWeb0.addLayer(markerWeb70);
markerClusterGroupWeb0.addLayer(markerWeb80);
markerClusterGroupWeb0.addLayer(markerWeb90);

// Добавляем группу кластеров на карту
map.addLayer(markerClusterGroupWeb0);

  // Создаем маркер с DivIcon
  var textWeb = L.marker([51.35+5, -1+10], { icon: createIconWithText('') });
  var textWeb0 = L.marker([52.35+5, 0+10], { icon: createIconWithText('') });
  var textWeb3 = L.marker([49.95+5, -1+10], { icon: createIconWithText('') });
  var textWeb4 = L.marker([49.95+5, 2+10], { icon: createIconWithText('') });
  var textWeb5 = L.marker([51.55+5, 3+10], { icon: createIconWithText('') });

  // Добавляем маркер на карту
  map.addLayer(textWeb0);
  map.addLayer(textWeb);
  map.addLayer(textWeb3);
  map.addLayer(textWeb4);
  map.addLayer(textWeb5);

  // Обработчик события изменения зума карты
function handleZoomEnd() {
    var zoomLevel = map.getZoom();

    // Проверяем состояние зума и отображаем/скрываем всплывающее окно
    if (zoomLevel <= 7 && zoomLevel > 5) {
        textWeb.setIcon(createIconWithText('Команда Виталия Цаля'));
        textWeb0.setIcon(createIconWithText('Команда Звёздочки'));
        textWeb3.setIcon(createIconWithText('Команда Ромашки'));
        textWeb4.setIcon(createIconWithText('Команда Зайки'));
        textWeb5.setIcon(createIconWithText('Команда Леди Баг и Супер-Код'));
    } else if (zoomLevel <= 5) {
        textWeb.setIcon(createIconWithText(''));
        textWeb0.setIcon(createIconWithText(''));
        textWeb3.setIcon(createIconWithText(''));
        textWeb4.setIcon(createIconWithText(''));
        textWeb5.setIcon(createIconWithText(''));
    }
    else {
        textWeb.setIcon(createIconWithText(''));
        textWeb0.setIcon(createIconWithText(''));
        textWeb3.setIcon(createIconWithText(''));
        textWeb4.setIcon(createIconWithText(''));
        textWeb5.setIcon(createIconWithText(''));
    }


    if (zoomLevel <= 7 && zoomLevel > 5) {
        text.setIcon(createIconWithText('Команда Мистер Макс'));
        text0.setIcon(createIconWithText('Команда Звёздочки'));
        text3.setIcon(createIconWithText('Команда Blank'));
        text4.setIcon(createIconWithText('Команда Зайки'));
        text5.setIcon(createIconWithText('Команда Мисс Кейти'));
    } else if (zoomLevel <= 5) {
        text.setIcon(createIconWithText(''));
        text0.setIcon(createIconWithText(''));
        text3.setIcon(createIconWithText(''));
        text4.setIcon(createIconWithText(''));
        text5.setIcon(createIconWithText(''));
    }
    else {
        text.setIcon(createIconWithText(''));
        text0.setIcon(createIconWithText(''));
        text3.setIcon(createIconWithText(''));
        text4.setIcon(createIconWithText(''));
        text5.setIcon(createIconWithText(''));
    }
}






// Создание круга с центром в координатах [широта, долгота]
var cityCircleWeb1 = L.circle([51.51+5, 1.5+10], {
    radius: 25000, // радиус круга в метрах
    color: '#d51e46', // цвет границы круга
    fillColor: '#d51e46', // цвет заливки круга
    fillOpacity: 1, // Возможность кликать по метке
    className: 'cityCircle'
}).addTo(map);

// Добавление всплывающей подсказки с текстом внутрь круга
cityCircleWeb1.bindTooltip("Tomsk", {
    permanent: true, // Постоянная подсказка
    direction: 'center', // Выравнивание текста по центру
    className: 'circle-tooltip' // CSS-класс для стилизации подсказки
});














// Создаем группу кластеров с настроенной иконкой
var markerClusterGroupWeb1 = L.markerClusterGroup({
    maxClusterRadius: 50,
    iconCreateFunction: function(cluster) {
        var childCount = cluster.getChildCount();
        var iconSize = [40, 40];
        var className = 'custom-cluster-icon';

        return L.divIcon({
            html: '<div class="' + className + '"></div>',
            className: className,
            iconSize: iconSize
        });
    }
});




// Добавляем маркеры в группу кластеров
var markerWeb11 = L.marker([50.85+5, -0.5+10], {
    icon: customIcon
});
var markerWeb21 = L.marker([50.0+5, -0.63+10], {
    icon: customIcon
});
var markerWeb31 = L.marker([50.16+5, -0.68+10], {
    icon: customIcon
});
var markerWeb41 = L.marker([50.193+5, -0.3+10], {
    icon: customIcon
});
var markerWeb51 = L.marker([50.55+5, -0.34+10], {
    icon: customIcon
});
var markerWeb61 = L.marker([50.362+5, 0.03+10], {
    icon: customIcon
});
var markerWeb71 = L.marker([50.47+5, 0.3+10], {
    icon: customIcon
});
var markerWeb81 = L.marker([50.3+5, 0.4+10], {
    icon: customIcon
});
var markerWeb91 = L.marker([49.9+5, 0.4+10], {
    icon: customIcon
});
var markerWeb101 = L.marker([49.7+5, -0.06+10], {
    icon: customIcon
});

// Создание круга с центром в координатах [широта, долгота]
var circleTeamWeb11 = L.circle([50.11+5, 0+10], {
    radius: 4000, // радиус круга в метрах
    color: '#e32e56', // цвет границы круга
    fillColor: '#ff335f', // цвет заливки круга
    fillOpacity: 1, // прозрачность заливки круга (от 0 до 1)
    className: 'teamCircle'
}).addTo(map);

var polylineWeb11 = L.polyline([circleTeamWeb11.getLatLng(), markerWeb11.getLatLng(), circleTeamWeb11.getLatLng(),  markerWeb21.getLatLng(), circleTeamWeb11.getLatLng(),  markerWeb31.getLatLng(), circleTeamWeb11.getLatLng(), markerWeb41.getLatLng(), circleTeamWeb11.getLatLng(), markerWeb51.getLatLng(), circleTeamWeb11.getLatLng()], { color: '#f7edbd' }).addTo(map);
var polylineWeb21 = L.polyline([circleTeamWeb11.getLatLng(), markerWeb61.getLatLng(), circleTeamWeb11.getLatLng(),  markerWeb71.getLatLng(), circleTeamWeb11.getLatLng(),  markerWeb81.getLatLng(), circleTeamWeb11.getLatLng(), markerWeb91.getLatLng(), circleTeamWeb11.getLatLng(), markerWeb101.getLatLng(), circleTeamWeb11.getLatLng()], { color: '#f7edbd' }).addTo(map);
polylineWeb11.bringToBack();
polylineWeb21.bringToBack();
// var polylinez = L.polyline([ marker1.getLatLng(),  marker2.getLatLng(),  marker3.getLatLng(), marker4.getLatLng(), marker5.getLatLng()], { color: '#1e1e1e79' }).addTo(map);
markerClusterGroupWeb1.addLayer(markerWeb101);
markerClusterGroupWeb1.addLayer(markerWeb11);
markerClusterGroupWeb1.addLayer(markerWeb21);
markerClusterGroupWeb1.addLayer(markerWeb31);
markerClusterGroupWeb1.addLayer(markerWeb41);
markerClusterGroupWeb1.addLayer(markerWeb51);
markerClusterGroupWeb1.addLayer(markerWeb61);
markerClusterGroupWeb1.addLayer(markerWeb71);
markerClusterGroupWeb1.addLayer(markerWeb81);
markerClusterGroupWeb1.addLayer(markerWeb91);

// Добавляем группу кластеров на карту
map.addLayer(markerClusterGroupWeb1);















// Создаем группу кластеров с настроенной иконкой
var markerClusterGroupWeb2 = L.markerClusterGroup({
    maxClusterRadius: 50,
    iconCreateFunction: function(cluster) {
        var childCount = cluster.getChildCount();
        var iconSize = [40, 40];
        var className = 'custom-cluster-icon';

        return L.divIcon({
            html: '<div class="' + className + '"></div>',
            className: className,
            iconSize: iconSize
        });
    }
});




// Добавляем маркеры в группу кластеров
var markerWeb12 = L.marker([50.85+5, 1.5+10], {
    icon: newCustomIcon
});
var markerWeb22 = L.marker([50.0+5, 2.63+10], {
    icon: newCustomIcon
});
var markerWeb32 = L.marker([50.16+5, 1.68+10], {
    icon: newCustomIcon
});
var markerWeb42 = L.marker([50.193+5, 2.3+10], {
    icon: newCustomIcon
});
var markerWeb52 = L.marker([50.55+5, 1.34+10], {
    icon: newCustomIcon
});
var markerWeb62 = L.marker([50.362+5, 2.03+10], {
    icon: newCustomIcon
});
var markerWeb72 = L.marker([50.47+5, 2.3+10], {
    icon: newCustomIcon
});
var markerWeb82 = L.marker([50.3+5, 2.4+10], {
    icon: newCustomIcon
});
var markerWeb92 = L.marker([49.9+5, 2.4+10], {
    icon: newCustomIcon
});
var markerWeb202 = L.marker([49.7+5, 1.06+10], {
    icon: newCustomIcon
});

// Создание круга с центром в координатах [широта, долгота]
var circleTeamWeb12 = L.circle([50.11+5, 2+10], {
    radius: 4000, // радиус круга в метрах
    color: '#e32e56', // цвет границы круга
    fillColor: '#ff335f', // цвет заливки круга
    fillOpacity: 1, // прозрачность заливки круга (от 0 до 1)
    className: 'teamCircle'
}).addTo(map);

var polylineWeb12 = L.polyline([circleTeamWeb12.getLatLng(), markerWeb12.getLatLng(), circleTeamWeb12.getLatLng(),  markerWeb22.getLatLng(), circleTeamWeb12.getLatLng(),  markerWeb32.getLatLng(), circleTeamWeb12.getLatLng(), markerWeb42.getLatLng(), circleTeamWeb12.getLatLng(), markerWeb52.getLatLng(), circleTeamWeb12.getLatLng()], { color: '#f7edbd' }).addTo(map);
var polylineWeb22 = L.polyline([circleTeamWeb12.getLatLng(), markerWeb62.getLatLng(), circleTeamWeb12.getLatLng(),  markerWeb72.getLatLng(), circleTeamWeb12.getLatLng(),  markerWeb82.getLatLng(), circleTeamWeb12.getLatLng(), markerWeb92.getLatLng(), circleTeamWeb12.getLatLng(), markerWeb202.getLatLng(), circleTeamWeb12.getLatLng()], { color: '#f7edbd' }).addTo(map);
polylineWeb12.bringToBack();
polylineWeb22.bringToBack();
// var polylinez = L.polyline([ marker1.getLatLng(),  marker2.getLatLng(),  marker3.getLatLng(), marker4.getLatLng(), marker5.getLatLng()], { color: '#1e1e1e79' }).addTo(map);
markerClusterGroupWeb2.addLayer(markerWeb202);
markerClusterGroupWeb2.addLayer(markerWeb12);
markerClusterGroupWeb2.addLayer(markerWeb22);
markerClusterGroupWeb2.addLayer(markerWeb32);
markerClusterGroupWeb2.addLayer(markerWeb42);
markerClusterGroupWeb2.addLayer(markerWeb52);
markerClusterGroupWeb2.addLayer(markerWeb62);
markerClusterGroupWeb2.addLayer(markerWeb72);
markerClusterGroupWeb2.addLayer(markerWeb82);
markerClusterGroupWeb2.addLayer(markerWeb92);

// Добавляем группу кластеров на карту
map.addLayer(markerClusterGroupWeb2);
  




















// Создаем группу кластеров с настроенной иконкой
var markerClusterGroupWeb3 = L.markerClusterGroup({
    maxClusterRadius: 50,
    iconCreateFunction: function(cluster) {
        var childCount = cluster.getChildCount();
        var iconSize = [40, 40];
        var className = 'custom-cluster-icon';

        return L.divIcon({
            html: '<div class="' + className + '"></div>',
            className: className,
            iconSize: iconSize
        });
    }
});




// Добавляем маркеры в группу кластеров
var markerWeb13 = L.marker([52.85+5, 3.5+10], {
    icon: newCustomIcon
});
var markerWeb23 = L.marker([52.0+5, 4.93+10], {
    icon: newCustomIcon
});
var markerWeb33 = L.marker([52.16+5, 4.38+10], {
    icon: newCustomIcon
});
var markerWeb43 = L.marker([52.193+5, 3.3+10], {
    icon: newCustomIcon
});
var markerWeb53 = L.marker([52.55+5, 3.84+10], {
    icon: newCustomIcon
});
var markerWeb63 = L.marker([52.362+5, 4.53+10], {
    icon: newCustomIcon
});
var markerWeb73 = L.marker([52.47+5, 3.3+10], {
    icon: newCustomIcon
});
var markerWeb83 = L.marker([51.7+5, 4.4+10], {
    icon: newCustomIcon
});
var markerWeb93 = L.marker([51.9+5, 3+10], {
    icon: newCustomIcon
});
var markerWeb303 = L.marker([51.7+5, 3.56+10], {
    icon: newCustomIcon
});

// Создание круга с центром в координатах [широта, долгота]
var circleTeamWeb13 = L.circle([52.11+5, 4+10], {
    radius: 4000, // радиус круга в метрах
    color: '#e32e56', // цвет границы круга
    fillColor: '#ff335f', // цвет заливки круга
    fillOpacity: 1, // прозрачность заливки круга (от 0 до 1)
    className: 'teamCircle'
}).addTo(map);

var polylineWeb13 = L.polyline([circleTeamWeb13.getLatLng(), markerWeb13.getLatLng(), circleTeamWeb13.getLatLng(),  markerWeb23.getLatLng(), circleTeamWeb13.getLatLng(),  markerWeb33.getLatLng(), circleTeamWeb13.getLatLng(), markerWeb43.getLatLng(), circleTeamWeb13.getLatLng(), markerWeb53.getLatLng(), circleTeamWeb13.getLatLng()], { color: '#f7edbd' }).addTo(map);
var polylineWeb23 = L.polyline([circleTeamWeb13.getLatLng(), markerWeb63.getLatLng(), circleTeamWeb13.getLatLng(),  markerWeb73.getLatLng(), circleTeamWeb13.getLatLng(),  markerWeb83.getLatLng(), circleTeamWeb13.getLatLng(), markerWeb93.getLatLng(), circleTeamWeb13.getLatLng(), markerWeb303.getLatLng(), circleTeamWeb13.getLatLng()], { color: '#f7edbd' }).addTo(map);
polylineWeb13.bringToBack();
polylineWeb23.bringToBack();
// var polylinez = L.polyline([ marker1.getLatLng(),  marker2.getLatLng(),  marker3.getLatLng(), marker4.getLatLng(), marker5.getLatLng()], { color: '#1e1e1e79' }).addTo(map);
markerClusterGroupWeb3.addLayer(markerWeb303);
markerClusterGroupWeb3.addLayer(markerWeb13);
markerClusterGroupWeb3.addLayer(markerWeb23);
markerClusterGroupWeb3.addLayer(markerWeb33);
markerClusterGroupWeb3.addLayer(markerWeb43);
markerClusterGroupWeb3.addLayer(markerWeb53);
markerClusterGroupWeb3.addLayer(markerWeb63);
markerClusterGroupWeb3.addLayer(markerWeb73);
markerClusterGroupWeb3.addLayer(markerWeb83);
markerClusterGroupWeb3.addLayer(markerWeb93);

// Добавляем группу кластеров на карту
map.addLayer(markerClusterGroupWeb3);
  





var polylineCityTeamWeb = L.polyline([cityCircleWeb1.getLatLng(), circleTeamWeb1.getLatLng(), cityCircleWeb1.getLatLng(), circleTeamWeb10.getLatLng(), cityCircleWeb1.getLatLng(), circleTeamWeb11.getLatLng(), cityCircleWeb1.getLatLng(),  circleTeamWeb12.getLatLng(), cityCircleWeb1.getLatLng(),  circleTeamWeb13.getLatLng(), cityCircleWeb1.getLatLng()], { color: '#dda187', weight: 7 }).addTo(map);
polylineCityTeamWeb.bringToBack();



// Функция для создания иконки с текстом
function createIconWithText(text) {
    return L.divIcon({
      className: 'custom-div-icon',
      html: '<div class="icon-text">' + text + '</div>',
    });
  }

// Добавляем обработчик события изменения зума
map.on('zoomend', handleZoomEnd);
}