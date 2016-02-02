var clothingAppControllers = angular.module('clothingAppControllers', []);

clothingAppControllers.controller('CategoryCtrl', ['$routeParams', 'Products',
  function($routeParams, Products) {
    var self = this;

    Products.getList($routeParams.category).then(function(category){
      self.products = category.data.products;
    });

  }
]);
