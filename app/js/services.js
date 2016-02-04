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
