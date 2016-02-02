var clothingApp = angular.module('clothingApp', [
  'ngRoute',
  'ngResource',
  'clothingAppControllers',
  'clothingAppServices'
]);

clothingApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home-page.html'
      }).
      when('/home/:category', {
        templateUrl: 'partials/category-page.html',
        controller: "CategoryCtrl",
        controllerAs: "category"
      }).
      otherwise({
        redirectTo: '/home'
      });
  }
]);
