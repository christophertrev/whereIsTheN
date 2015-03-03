angular.module('starter.controllers', [
  'starter.services',
  'firebase'
])

.controller('MapCtrl', function($scope, $ionicLoading, posImages, $firebase) {
  var trainMarkers = {};
  var transitLine = 'N';
  var transitRef = new Firebase("https://publicdata-transit.firebaseio.com/sf-muni");
  var nIndex = transitRef.child('routes').child(transitLine);
  // console.log($scope.data = $firebase(nIndex).$asObject())
  nIndex.on('child_added',function (child){
    // console.log(child.key())
    var id = child.key();
    // id = 1534;
    transitRef.child('vehicles').child(id).on('value', function(item){
      var vechicle = item.val();
      console.log('vec',vechicle)
      if( vechicle && vechicle.routeTag !== 'N'){
        return;
      }
      // console.log('asdf', trainMarkers[vechicle.id])
      if (vechicle && !trainMarkers[vechicle.id]){
        trainMarkers[vechicle.id] = new google.maps.Marker({
          position: new google.maps.LatLng(vechicle.lat, vechicle.lon),
          map: $scope.map,
          title: vechicle.id.toString(),
          icon: posImages.train,
        });
      } else {
        trainMarkers[vechicle.id].setPosition(new google.maps.LatLng(vechicle.lat, vechicle.lon))
      }
      // console.log(item.val())
      //update lat long;
    })
  })


  // nIndex.on('child_removed', function(snapshot) {
  //   var id = snapshot.key();
  //   transitRef.child('data').child(id).off('value', busUpdated);
  // });


  // var sync = $firebase(ref);
  // download the data into a local object
  // var syncObject = sync.$asObject();
  // synchronize the object with a three-way data binding
  // click on `index.html` above to see it used in the DOM!
  // syncObject.$bindTo($scope, "data");

  $scope.mapCreated = function(map) {
    $scope.map = map;
  };

  var marker = [];
  var currPosMarker = null; 
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
    // console.log(navigator.geolocation)
    navigator.geolocation.watchPosition(function (pos) {
      console.log('Got pos', pos);
      // $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      // $scope.posImage = posImages.happy;
      if(currPosMarker === null){
        currPosMarker = new google.maps.Marker({
          position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
          map: $scope.map,
          title: 'Your Current Position',
          icon: $scope.posImage,
        });
        // marker.push(currPosMarker);
      } else {
        // marker[0].setMap(null);
        currPosMarker.setPosition(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        // marker[0].setMap();

      }

      $scope.loading.hide();
    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  };
});
