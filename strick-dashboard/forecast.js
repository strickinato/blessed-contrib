var Forecast = require('forecast.io'),
    authKey = require('./private.json');


var options = {
  APIKey: authKey.forecastIO
}

var forecast = new Forecast(options);

module.exports = function(callback){
  var options = {
    exclude: 'minutely,daily,flags,alerts'
  }
  var time = new Date().setDate(0);
  forecast.get(37.7360532, -122.4249199, options, function (err, res, data) {
    if (err) throw err;
    callback(data)
  });
}
