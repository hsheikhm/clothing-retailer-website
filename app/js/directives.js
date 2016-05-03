var clothingAppDirectives = angular.module('clothingAppDirectives', []);

clothingAppDirectives.directive("mensCategories", function() {
  return {
    restrict: 'E',
    templateUrl: '/dist/partials/mens-categories.html'
  };
});

clothingAppDirectives.directive("womensCategories", function() {
  return {
    restrict: 'E',
    templateUrl: '/dist/partials/womens-categories.html'
  };
});

clothingAppDirectives.directive("productsList", function() {
  return {
    restrict: 'E',
    templateUrl: '/dist/partials/products-list.html'
  };
});

clothingAppDirectives.directive("itemsOrdered", function() {
  return {
    restrict: 'E',
    templateUrl: '/dist/partials/items-ordered.html'
  };
});
