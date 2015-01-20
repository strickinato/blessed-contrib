var google = require('googleapis');
var analytics = google.analytics('v3');


var authKey = require('./private.json');

var jwt = new google.auth.JWT(
  authKey.email,
  authKey.keyFile,
  null,
  authKey.scopes
);

module.exports = function(callback) {
  var gdata = jwt.authorize(function(err, tokens) {
    if (err) throw err;

    var data = analytics.data.ga.get({
      auth: jwt,
      "ids": "ga:61825146",
      "start-date": "7daysAgo",
      "end-date": "today",
      "metrics": "ga:totalEvents",
      "dimensions": "ga:eventAction,ga:eventLabel",
      "sort": "-ga:totalEvents"
    }, function(err, resp) {
      callback(resp);
    });
  });
}
