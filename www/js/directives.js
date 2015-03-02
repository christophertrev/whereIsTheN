angular.module('starter.directives', [])

.directive('map', function() {
  return {
    restrict: 'E',
    scope: {
      onCreate: '&'
    },
    link: function ($scope, $element, $attr) {
      function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(43.07493, -89.381388),
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map($element[0], mapOptions);
        var image = {
          url: 'img/smile.png',
           // This marker is 20 pixels wide by 32 pixels tall.
          size: new google.maps.Size(20, 32),
           // The origin for this image is 0,0.
          origin: new google.maps.Point(0,0),
           // The anchor for this image is the base of the flagpole at 0,32.
          anchor: new google.maps.Point(0, 32)
        };



        $scope.onCreate({map: map});
        navigator.geolocation.getCurrentPosition(function (pos){
          var currPosMarker = new google.maps.Marker({
          position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
          map: map,
          title: 'Uluru (Ayers Rock)',
          icon: image,

        });
        })
        // Stop the side bar from dragging when mousedown/tapdown on the map
        google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
          e.preventDefault();
          return false;
        });
      }

      if (document.readyState === "complete") {
        initialize();
      } else {
        google.maps.event.addDomListener(window, 'load', initialize);
      }
    }
  }
});
