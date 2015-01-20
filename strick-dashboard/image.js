var ImageToAscii = require("image-to-ascii");

module.exports = function(imagePath, callback) {
  ImageToAscii(imagePath, function(err, converted) {
    callback(converted)
  })
}
