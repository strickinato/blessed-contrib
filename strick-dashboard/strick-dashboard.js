var blessed = require('blessed')
, contrib = require('../index')
, analytics = require('./analytics')(fillAnalytics)
, forecast = require('./forecast')(fillForecast)

var screen = blessed.screen();

//Build Grids
var gridMain = new contrib.grid({rows: 1, cols: 2});
var gridRight = new contrib.grid({rows: 2, cols: 1});
var gridRightBottom = new contrib.grid({rows: 1, cols: 2});

gridRightBottom.set(0, 0, contrib.table, {
  keys: true,
  fg: 'green',
  label: 'Events',
  columnSpacing: 16
});

gridRight.set(0, 0, contrib.line, {
  style: {
      line: "yellow"
    , text: "green"
    , baseline: "black"
  }
  , xLabelPadding: 3
  , xPadding: 5
  , label: 'Forecast'
  , maxY: 100
});
//FILLER
gridMain.set(0, 0, contrib.map, {label: 'Left Location'})
gridRightBottom.set(0, 1, contrib.map, {label: 'Servers Location'})

//INSERTS
gridMain.set(0, 1, gridRight);
gridRight.set(1, 0, gridRightBottom)

gridMain.applyLayout(screen);

var line = gridRight.get(0, 0);
var table = gridRightBottom.get(0, 0);

function fillAnalytics(data) {
  var headers = ["Action", "Label", "Count"];

  table.setData({ headers: headers, data: data.rows });
  screen.render();
}
setInterval(function() { analytics(fillAnalytics); }, 360000)


function fillForecast(data) {
  line.setLabel(data.hourly.summary);
  var xData = [];
  var yData = [];

  for(var i = 0; i < 12; i++) {
    var point = data.hourly.data[(i * 2)];
    var date = new Date();
    date.setTime(point.time * 1000);

    xData.push(date.getHours() + ":00")
    yData.push(point.apparentTemperature)
  }

  line.setData(xData, yData)
  screen.render();
}
setInterval(function() { forecast(fillForecast); }, 60000)


/* Other methods */
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

screen.render();
