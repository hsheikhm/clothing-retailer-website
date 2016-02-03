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
    self.totalPrice = 0;

    self.addToCart = function(product){
      self.shoppingCart.push(product);
      product.quantity -= 1;
      self.calculateTotalPrice();
    };

    self.removeFromCart = function(product){
      position = self.shoppingCart.indexOf(product);
      self.shoppingCart.splice(position, 1);
      product.quantity += 1;
      self.calculateTotalPrice();
    };

    self.calculateTotalPrice = function(){
      self.shoppingCart.forEach(function(product){
        self.totalPrice += product.price;
      });
    };

    self.checkValidVoucher = function(){

    };

    self.voucherOneValid = function(){

    };

    self.voucherTwoValid = function(){

    };

    self.voucherThreeValid = function(){

    };

    self.applyVoucherOne = function(){

    };

    self.applyVoucherTwo = function(){

    };

    self.applyVoucherThree = function(){

    };

  }
);
