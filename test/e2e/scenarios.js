describe('clothingApp', function(){

  it('should redirect index.html to index.html#/home', function(){
    browser.get('app/index.html');
    browser.getLocationAbsUrl().then(function(url){
      expect(url).toEqual('/home');
    });
  });

  describe('Home page view', function(){

    beforeEach(function(){
      browser.get('app/index.html#/home');
    });

    it('should display all 6 available categories', function(){
      var categories = element.all(by.css('.category-title')).getText();
      expect(categories).toMatch([
        'MEN’S FOOT-WEAR',
        'MEN’S CASUAL-WEAR',
        'MEN’S FORMAL-WEAR',
        'WOMEN’S FOOT-WEAR',
        'WOMEN’S CASUAL-WEAR',
        'WOMEN’S FORMAL-WEAR'
      ]);
    });

    it('should direct user to a category page when a category is clicked on', function(){
      element.all(by.css('.category-box')).first().click();
      browser.getLocationAbsUrl().then(function(url){
        expect(url).toEqual('/home/men-footwear');
      });
    });

  });

  describe('Category page view', function(){

    beforeEach(function(){
      browser.get('app/index.html#/home');
      element.all(by.css('.category-box')).first().click();
    });

    it('should display the category name at the top', function(){
      expect(element(by.css('.section-header')).getText()).toEqual("MEN’S FOOT-WEAR");
    });

    it('should display the names of available products', function(){
      var productNames = element.all(by.css('.product-name-value')).getText();
      expect(productNames).toMatch([
        "Leather Driver Saddle Loafers, Tan",
        "Flip Flops, Red",
        "Flip Flops, Blue"
      ]);
    });

    it('should display the prices of available products', function(){
      var productPrices = element.all(by.css('.product-price-value')).getText();
      expect(productPrices).toMatch(["£34.00", "£19.00", "£19.00"]);
    });

    it('should display the stock quagsntities of available products', function(){
      var productQuantities = element.all(by.css('.product-stock-value')).getText();
      expect(productQuantities).toMatch(["12", "6", "0"]);
    });

    describe('Adding a product to the shopping cart', function(){

      beforeEach(function(){
        element.all(by.css('.add-button')).first().click();
      });

      it("should show the product's quantity being reduced by 1", function(){
        expect(element.all(by.css('.product-stock-value')).first().getText()).toMatch("11");
      });

      it("should show the shopping cart items figure increase by 1", function(){
        expect(element(by.css('.shopping-cart-tally')).getText()).toMatch("MY SHOPPING CART 1");
      });

    });

    describe('Trying to add an out-of-stock product into shopping cart', function(){

      beforeEach(function(){
        element.all(by.css('.add-button')).last().click();
      });

      it("should display an out-of-stock message", function(){
        var message = "This product is out of stock!";
        expect(element.all(by.css('.out-of-stock-message')).last().getText()).toMatch(message);
      });

      it("should not change the shopping cart items figure", function(){
        expect(element(by.css('.shopping-cart-tally')).getText()).toMatch("MY SHOPPING CART 0");
      });

    });

  });

});
