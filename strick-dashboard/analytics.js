var google = require('googleapis');
var analytics = google.analytics('v3');
var OAuth2Client = google.auth.OAuth2;


var authKey = require('./private.json')

var jwt = new google.auth.JWT(
  authKey.email,
  authKey.keyFile,
  null,
  authKey.scopes
);

module.exports = function() {
  var gdata = jwt.authorize(function(err, tokens) {
    if (err) throw err;

    var data = analytics.data.ga.get({
      auth: jwt,
      "ids": "ga:61825146",
      "start-date": '2015-01-12',
      "end-date": '2015-01-14',
      "metrics": "ga:visits"
    }, function(err, resp) {
      return resp
    });
  });
}
