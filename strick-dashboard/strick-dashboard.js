var blessed = require('blessed')
, contrib = require('../index');

var screen = blessed.screen();


var grid = new contrib.grid({rows: 1, cols: 2});

grid.set(0, 0, contrib.bar, {
  label: 'Google Sessions / Day',
  barWidth: 8,
  barSpacing: 10,
  xOffset: 0,
  maxHeight: 20
});

grid.set(0, 1, contrib.map, {label: 'Servers Location'})

grid.applyLayout(screen);

var bar = grid.get(0, 0);
var map = grid.get(0, 1);



/*Dummy data for the Bar Graph */
var servers = ['US1', 'US2', 'EU1', 'AU1', 'AS1', 'JP1']

function fillBar() {
  var arr = []
  for (var i=0; i<servers.length; i++) {
    arr.push(Math.round(Math.random()*10))
  }
  bar.setData({titles: servers, data: arr})
}
fillBar()
setInterval(fillBar, 2000)


/* Dummy data for the map */
  var marker = true
  setInterval(function() {
    if (marker) {
      map.addMarker({"lon" : "37.5000", "lat" : "-79.0000" })
      map.addMarker({"lon" : "45.5200", "lat" : "-122.6819" })
      map.addMarker({"lon" : "53.3478", "lat" : "-6.2597" })
      map.addMarker({"lon" : "1.3000", "lat" : "103.8000" })
    }
    else {
      map.clearMarkers()
    }
    marker =! marker
    screen.render()
  }, 1000)



/* Other methods to go */
  screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  });

  screen.render()
