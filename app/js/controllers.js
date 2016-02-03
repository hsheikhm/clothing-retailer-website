var clothingAppControllers = angular.module('clothingAppControllers', []);

clothingAppControllers.controller('CategoryCtrl', ['$routeParams', 'Products',
  function($routeParams, Products) {

    var self = this;

    Products.getList($routeParams.category).then(function(category){
      self.products = category.data.products;
    });

  }
]);

clothingAppControllers.controller('CustomerCtrl', ['ShoppingCart',
  function(ShoppingCart) {

    var self = this;

    var customer = new ShoppingCart();

    self.shoppingCart = customer.cart;

    self.addToCart = function(product){
      if(customer.add(product)){ return true; }
      else {
        self.selectedProduct = product;
        self.printOutOfStockMessage(product); }
    };

    self.printOutOfStockMessage = function(product){
      return self.selectedProduct === product;
    };

    self.removeFromCart = function(product){
      customer.remove(product);
    };

    self.cartTotalPrice = function(){
      return customer.totalPrice;
    };

    self.checkValidVoucher = function(){
      if(self.voucherOneValid()){ self.applyDiscount(5); }
      else if(self.voucherTwoValid()){ self.applyDiscount(10); }
      else if(self.voucherThreeValid()){ self.applyDiscount(15); }
      else {
        self.invalidVoucher = true;
        self.discountMessage = false;
      }
    };

    self.voucherOneValid = function(){
      return self.voucherCode === "001" && self.cartTotalPrice() >= 5;
    };

    self.voucherTwoValid = function(){
      return self.voucherCode === "002" && self.cartTotalPrice() >= 50;
    };

    self.voucherThreeValid = function(){
      if(self.voucherCode === "003"){
        return customer.orderedMoreThanOneFootwearItem() && self.cartTotalPrice() >= 75;
      } else { return false; }
    };

    self.applyDiscount = function(discount){
      customer.totalPrice -= discount;
      self.discount = discount;
      self.invalidVoucher = false;
      self.discountMessage = true;
      self.voucherCode = "";
    };

  }
]);
