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
      var total = 0;
      self.shoppingCart.forEach(function(product){
        total += product.price;
      });
      self.totalPrice = total;
    };

    self.checkValidVoucher = function(){
      if(self.voucherOneValid()){ self.applyDiscount(5); }
      else if(self.voucherTwoValid()){ self.applyDiscount(10); }
      else if(self.voucherThreeValid()){ self.applyDiscount(15); }
      else {self.invalidVoucher = true;}
    };

    self.voucherOneValid = function(){
      return self.voucherCode === "001" && self.totalPrice >= 5;
    };

    self.voucherTwoValid = function(){
      return self.voucherCode === "002" && self.totalPrice >= 50;
    };

    self.voucherThreeValid = function(){
      return self.moreThanOneFootwearItem() && self.totalPrice >= 75;
    };

    self.moreThanOneFootwearItem = function(){
      var footwearItems = 0;
      self.shoppingCart.forEach(function(product){
        if(product.category === "Men’s Footwear" || product.category === "Women’s Footwear"){
          footwearItems += 1;
        }
      });
      return footwearItems > 0;
    };

    self.applyDiscount = function(discount){
      self.totalPrice -= discount;
      self.invalidVoucher = false;
    };

  }
);
