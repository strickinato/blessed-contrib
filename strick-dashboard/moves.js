var Moves = require('moves'),
    authKey = require('./private.json');


var moves = new Moves({
  client_id: authKey.movesClientId,
  client_secret: authKey.movesClientSecret
});

var authorizeUrl = moves.authorize({
  scope: ['activity']
});

console.log(authorizeUrl)

module.exports = function() {
    console.log(authorizeUrl)
}

moves.token('', function(error, response, body) {
  var access_token = body.access_token
  , refresh_token = body.refresh_token
  , expires_in = body.expires_in
  console.log(body)
  console.log(access_token)
})
