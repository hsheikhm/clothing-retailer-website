var clothingAppDirectives = angular.module('clothingAppDirectives', []);

clothingAppDirectives.directive("mensCategories", function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/mens-categories.html'
  };
});

clothingAppDirectives.directive("womensCategories", function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/womens-categories.html'
  };
});

clothingAppDirectives.directive("productsList", function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/products-list.html'
  };
});

clothingAppDirectives.directive("itemsOrdered", function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/items-ordered.html'
  };
});
