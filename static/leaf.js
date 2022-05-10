var mymap = L.map('mapid').setView([25.512, 20.104], 2);

L.tileLayer('   https://api.maptiler.com/maps/hybrid/256/{z}/{x}/{y}.jpg?key=bvyvAPyZ7H2S6PR2Tq2h', {
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: 'bvyvAPyZ7H2S6PR2Tq2h'
}).addTo(mymap);

var source = new EventSource('/topic/twitterdata1');

source.addEventListener('message', function(e){
    obj = JSON.parse(e.data);
    lat = obj.place.bounding_box.coordinates[0][0][1];
    long = obj.place.bounding_box.coordinates[0][0][0];
    username = obj.user.name;
    tweet = obj.text;
    profileimg=obj.user.profile_image_url;
    hashtag = obj.entities.hashtags[0];
    marker = L.marker([lat,long],).addTo(mymap).bindPopup('Username: <strong>' + username + '</strong><br>Tweet: <strong>' + tweet + '</strong>');

    appendData(username,tweet,profileimg);
 
}, false);


function appendData(username,tweet,profileimg) 
{
  
  var mainContainer = document.getElementById("PQ");
  var div = document.createElement("div");
  var img = document.createElement("div");
  // img.classList='profile-img';
  div.classList='card-top';
  // img.innerHTML ='<img src="'+profileimg+'" />';
  div.innerHTML = '<img src="'+profileimg+'" style="float:left; padding-right:5px; border-radius:50px;" /> <strong>' + username + '</strong><br>' + tweet;
  // div.appendChild(img);
  mainContainer.appendChild(div);
  
}


L.control.scale().addTo(mymap);
setInterval(function(){
    map.setView([0, 0]);
    setTimeout(function(){
        map.setView([60, 0]);
    }, 2000);
}, 4000);

var searchControl = L.esri.Geocoding.geosearch({
  position: 'topright',
  placeholder: 'Enter an address or place e.g. 1 York St',
  useMapBounds: false,
  providers: [L.esri.Geocoding.arcgisOnlineProvider({
    apikey: "AAPKa8d2b8db3fd14e77ae4505c7e20096f0JB6KH1YI-s95S8qSJ3BE1mSkL0bQs9WhLNeEU-ERX_pPGFPPBLy6WFNdTlqvODgp", // replace with your api key - https://developers.arcgis.com/dashboard/
    nearby: {
      lat: -33.8688,
      lng: 151.2093
    }
  })]
}).addTo(mymap);

var results = L.layerGroup().addTo(mymap);

searchControl.on('results', function (data) {
  results.clearLayers();
  for (var i = data.results.length - 1; i >= 0; i--) {
    results.addLayer(L.marker(data.results[i].latlng));
  }
});