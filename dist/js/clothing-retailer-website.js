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

// next file:
var clothingAppControllers = angular.module('clothingAppControllers', []);

clothingAppControllers.controller('CategoryCtrl', ['$routeParams', 'Products',
  function($routeParams, Products) {

    var self = this;

    Products.getList($routeParams.category).then(function(category){
      self.products = category.data.products;
      self.productCategory = self.products[0].category;
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

// next file:
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

// next file:
var clothingAppServices = angular.module('clothingAppServices', []);

clothingAppServices.factory('Products', ['$http',
  function($http){
    return {
      getList: function(category){
        return $http.get('products/' + category + '.json');
      }
    };
  }
]);

clothingAppServices.factory('ShoppingCart', function() {
  function shoppingCart() {

    this.cart = [];
    this.totalPrice = 0;

    this.add = function(product){
      if(this.productIsAvailable(product)){
        this.cart.push(product);
        product.quantity -= 1;
        this.calculateTotalPrice();
        return true;
      } else { return false; }
    };

    this.productIsAvailable = function(product){
      return product.quantity > 0;
    };

    this.remove = function(product){
      position = this.cart.indexOf(product);
      this.cart.splice(position, 1);
      product.quantity += 1;
      this.calculateTotalPrice();
    };

    this.calculateTotalPrice = function() {
      var total = 0;
      this.cart.forEach(function(product){
        total += product.price;
      });
      this.totalPrice = total;
    };

    this.orderedMoreThanOneFootwearItem = function(){
      var footwearItems = 0;
      this.cart.forEach(function(product){
        if(product.category === "Men’s Foot-wear" || product.category === "Women’s Foot-wear"){
          footwearItems += 1;
        }
      });
      return footwearItems > 0;
    };

  }
  return shoppingCart;
});
