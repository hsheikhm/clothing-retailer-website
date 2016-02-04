describe('clothingAppControllers', function(){

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(module('clothingApp'));
  beforeEach(module('clothingAppServices'));
  beforeEach(module('clothingAppDirectives'));

  describe('CategoryCtrl', function(){

    var $httpBackend, http, ctrl;

    beforeEach(inject(function(_$httpBackend_, $http, $routeParams, $controller){
      $httpBackend = _$httpBackend_;
      http = $http;
      $httpBackend.expectGET('products/men-casualwear.json').respond(productsList);
      $routeParams.category = 'men-casualwear';
      ctrl = $controller('CategoryCtrl');
    }));

    var productsList = [
      {
        "name": "Fine Stripe Short Sleeve Shirt, Grey",
        "category": "Men’s Casual-wear",
        "price": 49.99,
        "quantity": 9
      },
      {
        "name": "Fine Stripe Short Sleeve Shirt, Green",
        "category": "Men’s Casual-wear",
        "price": 39.99,
        "quantity": 3
      }
    ];

    it('initializes with undefined products and productCategory models', function() {
      expect(ctrl.products).toBeUndefined();
      expect(ctrl.productCategory).toBeUndefined();
    });

    it("should create a 'products' model that contains a list of products", function(){
      expect(ctrl.products).toBeUndefined();
      http.get('products/men-casualwear.json').then(function(response){
        expect(ctrl.products).toEqualData(productsList);
      });
    });

    it("should create a 'productCategory' model that matches the category name", function(){
      expect(ctrl.productCategory).toBeUndefined();
      http.get('products/men-casualwear.json').then(function(response){
        expect(ctrl.productCategory).toEqualData("Men’s Casual-wear");
      });
    });

  });

  describe('CustomerCtrl', function(){

    var ctrl, shoppingCart, product;

    beforeEach(function() {
      shoppingCart = {
        cart: [],
        totalPrice: 0,
        add: function(product) {},
        productIsAvailable: function() {},
        remove: function() {},
        calculateTotalPrice: function() {},
        orderedMoreThanOneFootwearItem: function() {}
      };
    });

    beforeEach(inject(function($controller){
      ctrl = $controller('CustomerCtrl');
    }));

    product = {
      "name": "Lightweight Patch Pocket Blazer, Deer",
      "category": "Men’s Formal-wear",
      "price": 175.50,
      "quantity": 1
    };

    it('initializes with a new and empty shoppingCart', function(){
      expect(ctrl.shoppingCart).toEqualData(shoppingCart.cart);
    });

    describe('addToCart', function(){

      it('adds a product to the shopping cart if in stock', function(){
        expect(ctrl.addToCart(product)).toEqual(true);
      });

    });

  });


});
