angular.module('starter.controllers', [
  'starter.services'
])

.controller('MapCtrl', function($scope, $ionicLoading, posImages) {
  $scope.mapCreated = function(map) {
    $scope.map = map;
  };

  console.log(posImages)
  $scope.posImage = posImages.sad;

  $scope.currentPosition = { 
    lat:null,
    long: null
  };

  $scope.centerOnMe = function () {
    console.log("Centering");
    if (!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos);
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      // $scope.posImage = posImages.happy;
      var currPosMarker = new google.maps.Marker({
        position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
        map: $scope.map,
        title: 'Your Current Position',
        icon: $scope.posImage,

      });
      $scope.loading.hide();
    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  };
});
