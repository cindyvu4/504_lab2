var map = L.map('map').setView([47.25, -122.44], 11);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoiY2luZHl2dTQiLCJhIjoiY2sydzVleGJ3MGNkNDNpcW1odG1icDEwciJ9._9FHgo3Qa682z450P9Xz_w',
}).addTo(map);

var control = L.Routing.control({
        router: L.Routing.mapbox('pk.eyJ1IjoiY2luZHl2dTQiLCJhIjoiY2sydzVleGJ3MGNkNDNpcW1odG1icDEwciJ9._9FHgo3Qa682z450P9Xz_w'),
        geocoder: L.Control.Geocoder.mapbox('pk.eyJ1IjoiY2luZHl2dTQiLCJhIjoiY2sydzVleGJ3MGNkNDNpcW1odG1icDEwciJ9._9FHgo3Qa682z450P9Xz_w'),
          waypoints: [
              null
              // L.latLng(47.246587, -122.438830),
              // L.latLng(47.318017, -122.542970),
              // L.latLng(47.258024, -122.444725)
          ],
           routeWhileDragging: true,
           units:'imperial',
           collapsible: true,
           show: false,
           reverseWaypoints: true
      }).addTo(map);

      function createButton(label, container) {
          var btn = L.DomUtil.create('button', '', container);
          btn.setAttribute('type', 'button');
          btn.innerHTML = label;
          return btn;
      }

      map.on('click', function(e) {
          var container = L.DomUtil.create('div'),
              startBtn = createButton('Start from this location', container),
              destBtn = createButton('Go to this location', container);

              L.DomEvent.on(startBtn, 'click', function() {
                control.spliceWaypoints(0, 1, e.latlng);
                map.closePopup();
              });

              L.DomEvent.on(destBtn, 'click', function() {
                control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
                control.show();
                map.closePopup();
      });
          L.popup()
              .setContent(container)
              .setLatLng(e.latlng)
              .openOn(map);
});

function onLocationFound(e) {
    L.marker(e.latlng).addTo(map)
      .bindPopup("You are here. You can click anywhere on the map to select a starting or end point, or click on the wayPoint icon on the top right corner to type in address for directions.").openPopup();
}
    map.on('locationfound', onLocationFound); //this is the event listener

function onLocationError(e) {
    alert(e.message);
  }
    map.on('locationerror', onLocationError);
    map.locate({setView: true, maxZoom: 16});

    var LocationButton = L.easyButton({
      states: [{
              stateName: 'zoom-to-location',        // name the state
              icon:      'fas fa-location-arrow',               // and define its properties
              title:     'Zoom to a current location.',      // like its title
              onClick: function(btn, map) {       // and its callback
                  map.locate({setView: true, maxZoom: 16});
              }
      }]
  });
  LocationButton.addTo(map);
