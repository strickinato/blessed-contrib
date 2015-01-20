var blessed = require('blessed')
, contrib = require('../index')
, analytics = require('./analytics')(fillTable)

var screen = blessed.screen();


var grid = new contrib.grid({rows: 1, cols: 2});

grid.set(0, 0, contrib.table, {
  keys: true,
  fg: 'green',
  label: 'Events',
  columnSpacing: 16}
);

grid.set(0, 1, contrib.map, {label: 'Servers Location'})

grid.applyLayout(screen);

var table = grid.get(0, 0);
var map = grid.get(0, 1);

/* Website Analytics Table */
function fillTable(data) {
  var headers = ["Action", "Label", "Count"]

  table.setData({ headers: headers, data: data.rows });
}
setInterval(function() { analytics(fillTable); }, 360000)


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
