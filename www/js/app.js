angular.module('starter', [
  'ionic',
  'starter.controllers',
  'starter.directives',
  'starter.services',
  'firebase'
  ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
