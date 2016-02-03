var clothingAppControllers = angular.module('clothingAppControllers', []);

clothingAppControllers.controller('CategoryCtrl', ['$routeParams', 'Products',
  function($routeParams, Products) {

    var self = this;

    Products.getList($routeParams.category).then(function(category){
      self.products = category.data.products;
    });

  }
]);

clothingAppControllers.controller('CustomerCtrl',
  function() {

    var self = this;

    self.shoppingCart = [];

    self.addToCart = function(product){
      self.shoppingCart.push(product);
      product.quantity -= 1;
    };

    self.removeFromCart = function(product){
      position = self.shoppingCart.indexOf(product);
      self.shoppingCart.splice(position, 1);
      product.quantity += 1;
      self.totalPrice();
    };

    self.totalPrice = function(){
      var total = 0;
      self.shoppingCart.forEach(function(product){
        total += product.price;
      });
      return total;
    };

  }
);
