// Data for KPI 1 and KPI 2
//document.getElementById("sum-sick").innerHTML = maxSick;
//document.getElementById("sum-dead").innerHTML = maxDead;

var toner_lite = L.tileLayer('http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by Stamen Design, CC BY 3.0 — Map data © OpenStreetMap contributors, CC-BY-SA'});
var toner = L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL'});
var terrain = L.tileLayer('http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg', {
  attribution: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL'});
var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 19
});
var CartoDB_Voyager = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 10
});

var map = L.map('mapRegions',
            {center: [-18.913233, 47.521646],
              zoom: 6,
              layers: [CartoDB_DarkMatter]});


var LastUpdate = "22-03-2020 22:00 GMT+3";

// Start tutorial

// control that shows state info on hover
var info = L.control();

info.onAdd = function (map) {
this._div = L.DomUtil.create('div', 'info figures-layer');
this.update();
return this._div;
};

info.update = function (props) {
this._div.innerHTML = (props ?
	'<b>' + props.Region + '</b><br /><b>' + props.Sick + '</b> personnes infectées '+'<br /><b>'+ props.Dead + '</b> personnes mortes'
	: 'Survolez une région');
};

info.addTo(map);

var DateUpdate = L.control({position: 'bottomleft'});

DateUpdate.onAdd = function (map) {

var div = L.DomUtil.create('div', 'info legend update');
div.innerHTML = '<h4 style="margin:0;padding-top:0;">Dernière mise à jour</h4>' + '<b>' + LastUpdate + '</b>'

return div;
};

DateUpdate.addTo(map);

// get color depending on population density value
function getColor(d) {
	return d > 1000 ? '#800026' :
			d > 500  ? '#BD0026' :
			d > 200  ? '#E31A1C' :
			d > 100  ? '#FC4E2A' :
			d > 50   ? '#FD8D3C' :
			d > 20   ? '#FEB24C' :
			d > 1   ? '#FED976' :
						'#808080';
}

function style(feature) {
	return {
		weight: 2,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.7,
		fillColor: getColor(feature.properties.Sick)
	};
}

function highlightFeature(e) {
	var layer = e.target;

	layer.setStyle({
		weight: 5,
		color: '#666',
		dashArray: '',
		fillOpacity: 0.7
	});

	if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		layer.bringToFront();
	}

	info.update(layer.feature.properties);
}

var geojson;

function resetHighlight(e) {
	geojson.resetStyle(e.target);
	info.update();
}

function zoomToFeature(e) {
	map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
	layer.on({
		mouseover: highlightFeature,
		mouseout: resetHighlight,
		click: highlightFeature
	});
}

geojson = L.geoJson(MadaDataLevel2, {
	style: style,
	onEachFeature: onEachFeature
}).addTo(map);

map.attributionControl.addAttribution('&copy <a href="https://www.linkedin.com/in/faly-rasamimanana-526204a7/">Faly</a> ');


var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

	var div = L.DomUtil.create('div', 'info legend'),
		grades = [0, 1, 20, 50, 100, 200, 500, 1000],
		labels = [],
		from, to;

	for (var i = 0; i < grades.length; i++) {
		from = grades[i];
		to = grades[i + 1];

		labels.push(
			'<i style="background:' + getColor(from + 1) + '"></i> ' +
			from + (to ? '&ndash;' + to : '+'));
	}

	div.innerHTML = labels.join('<br>');
	return div;
};

legend.addTo(map);


// Onglets HTML
function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it

//document.getElementById("defaultOpen").click();
