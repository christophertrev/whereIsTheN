angular.module('starter.services', [])

.factory('nTracImages', function () {
  var image = {};

  image.happy = {
    url: 'img/smile.png',
     // This marker is 20 pixels wide by 32 pixels tall.
    size: new google.maps.Size(20, 20),
     // The origin for this image is 0,0.
    origin: new google.maps.Point(0,0),
     // The anchor for this image is the base of the flagpole at 0,32.
    anchor: new google.maps.Point(10, 10)
  };
  // return 'a12345654321x';
  return image;
});