var map = L.map('map').setView([-14.2921, -54.8219], 4);

// Camada base
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Popup ao clicar
let popup = L.popup();
function onMapClick(e){
    popup
    .setLatLng(e.latlng)
    .setContent("Você clicou em " + e.latlng.toString())
    .openOn(map);
}
map.on("click", onMapClick);

// Camadas WMS reais
let municipio = L.tileLayer.wms("http://201.75.169.140:8080/geoserver/wms", {
    layers: "aula:municipio",
    transparent: true,
    format: "image/png",
});
let bacia = L.tileLayer.wms("http://201.75.169.140:8080/geoserver/wms", {
    layers: "aula:bacia",
    transparent: true,
    format: "image/png",
});
let uf = L.tileLayer.wms("http://201.75.169.140:8080/geoserver/wms", {
    layers: "aula:uf",
    transparent: true,
    format: "image/png",
});


// Overlays: Camadas Reais + Download
let overlayMaps = {
     '<span>Municípios</span> <a href="http://201.75.169.140:8080/geoserver/aula/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=aula:municipio&outputFormat=SHAPE-ZIP" target="_blank" style="text-decoration:none; margin-left:100px; color:#007BFF;">💾</a>': municipio,
     '<span>Bacias Hidrográficas</span> <a href="http://201.75.169.140:8080/geoserver/aula/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=aula:bacia&outputFormat=SHAPE-ZIP" target="_blank" style="text-decoration:none; margin-left:33.5px; color:#007BFF;">💾</a>': bacia,
     '<span>Unidades Federativas</span> <a href="http://201.75.169.140:8080/geoserver/aula/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=aula:uf&outputFormat=SHAPE-ZIP" target="_blank" style="text-decoration:none; margin-left:25px; color:#007BFF;">💾</a>': uf,
    
};

// Camadas base
let googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
let googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
let googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
let googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
let cartoDB = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap, &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 20,
    minZoom: 0
});

// BaseMaps
let baseMaps = {
    "Google Hybrid": googleHybrid,
    "Google Streets": googleStreets,
    "Google Satellite": googleSat,
    "Google Terrain": googleTerrain,
    "CartoDB": cartoDB,
};

// Adiciona o controle de camadas
let layerControl = L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(map);

// Geocoder
L.Control.geocoder().addTo(map);
