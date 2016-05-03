var clothingApp = angular.module('clothingApp', [
  'ngRoute',
  'ngResource',
  'ngAnimate',
  'clothingAppControllers',
  'clothingAppServices',
  'clothingAppDirectives'
]);

clothingApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: '/dist/partials/home-page.html'
      }).
      when('/home/shopping-cart', {
        templateUrl: '/dist/partials/shopping-cart-page.html'
      }).
      when('/home/:category', {
        templateUrl: '/dist/partials/category-page.html',
        controller: "CategoryCtrl",
        controllerAs: "category"
      }).
      otherwise({
        redirectTo: '/home'
      });
  }
]);
