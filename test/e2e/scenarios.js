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

    it('should allow user to navigate diectly to their shopping cart', function(){
      element(by.css('.view-cart-link')).click();
      browser.getLocationAbsUrl().then(function(url){
        expect(url).toEqual('/home/shopping-cart');
      });
    });

  });

  describe('Category page view', function(){

    beforeEach(function(){
      browser.get('app/index.html#/home');
      element.all(by.css('.category-box')).first().click();
    });

    it('should allow user to go back to home page by clicking on back link', function(){
      element(by.css('.back-link')).click();
      browser.getLocationAbsUrl().then(function(url){
        expect(url).toEqual('/home');
      });
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

    it('should display the stock quantities of available products', function(){
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

  describe('Shopping cart view', function(){

    beforeEach(function(){
      browser.get('app/index.html#/home');
      element.all(by.css('.category-box')).first().click();
      element.all(by.css('.add-button')).first().click();
      element(by.css('.view-cart-link')).click();
    });

    it('should allow user to navigate back to home page to continue shopping', function(){
      element(by.css('.back-link')).click();
      browser.getLocationAbsUrl().then(function(url){
        expect(url).toEqual('/home');
      });
    });

    it("should display the header 'Items Ordered'", function(){
      expect(element.all(by.css('.section-header')).first().getText()).toMatch("ITEMS ORDERED");
    });

    describe('Shopping cart list', function(){

      it('should display the name of the product ordered', function(){
        var productName = "1 x Leather Driver Saddle Loafers, Tan";
        expect(element(by.css('.product-name-value')).getText()).toMatch(productName);
      });

      it('should display the category name of the product ordered', function(){
        var productCategory = "Men’s Foot-wear";
        expect(element(by.css('.product-category-value')).getText()).toMatch(productCategory);
      });

      it('should display the price of the product ordered', function(){
        expect(element(by.css('.product-price-value')).getText()).toMatch("£34.00");
      });

      it('should display the total price of the order', function(){
        expect(element(by.css('.total-price-figure')).getText()).toMatch("£34.00");
      });

    });

    describe('Removing a product from the shopping cart', function(){

      beforeEach(function(){
        element(by.css('.remove-button')).click();
      });

      it("should decrease the shopping cart items tally by 1", function(){
        expect(element(by.css('.shopping-cart-tally')).getText()).toMatch("MY SHOPPING CART 0");
      });

      it("should adjust the total price accordingly", function(){
        expect(element(by.css('.total-price-figure')).getText()).toMatch("£0.00");
      });

    });

    describe('Using an invalid voucher', function(){

      beforeEach(function(){
        var voucherCode = element(by.model('customer.voucherCode'));
        voucherCode.sendKeys('210');
        element(by.css('.voucher-button')).click();
      });

      it("should display a message confirming that the voucher is invalid", function(){
        var invalidMessage = "This voucher is not valid!";
        expect(element(by.css('.invalid-message')).getText()).toMatch(invalidMessage);
      });

      it("should not make any changes to the total price figure", function(){
        expect(element(by.css('.total-price-figure')).getText()).toMatch("£34.00");
      });

    });

    describe('Vouchers: £5 off voucher', function(){

      beforeEach(function(){
        var voucherCode = element(by.model('customer.voucherCode'));
        voucherCode.sendKeys('001');
        element(by.css('.voucher-button')).click();
      });

      it("should reduce the total price figure by £5", function(){
        expect(element(by.css('.total-price-figure')).getText()).toMatch("£29.00");
      });

      it("should display a message confirming that a discount has been applied", function(){
        var discountMessage = "Disount applied! £5 has been taken off your order.";
        expect(element(by.css('.discount-message')).getText()).toMatch(discountMessage);
      });

    });

    describe('Vouchers: £10 off voucher when spent over £50', function(){

      beforeEach(function(){
        element(by.css('.back-link')).click();
        element.all(by.css('.category-box')).first().click();
        element.all(by.css('.add-button')).first().click();
        element(by.css('.view-cart-link')).click();
        var voucherCode = element(by.model('customer.voucherCode'));
        voucherCode.sendKeys('002');
        element(by.css('.voucher-button')).click();
      });

      it("should reduce the total price figure by £10", function(){
        expect(element(by.css('.total-price-figure')).getText()).toMatch("£58.00");
      });

      it("should display a message confirming that a discount has been applied", function(){
        var discountMessage = "Disount applied! £10 has been taken off your order.";
        expect(element(by.css('.discount-message')).getText()).toMatch(discountMessage);
      });

    });

    describe('Vouchers: £15 off voucher when spent over £75 and ordered a foot-wear item', function(){

      beforeEach(function(){
        element(by.css('.back-link')).click();
        element.all(by.css('.category-box')).first().click();
        element.all(by.css('.add-button')).first().click();
        element.all(by.css('.add-button')).first().click();
        element(by.css('.view-cart-link')).click();
        var voucherCode = element(by.model('customer.voucherCode'));
        voucherCode.sendKeys('003');
        element(by.css('.voucher-button')).click();
      });

      it("should reduce the total price figure by £15", function(){
        expect(element(by.css('.total-price-figure')).getText()).toMatch("£87.00");
      });

      it("should display a message confirming that a discount has been applied", function(){
        var discountMessage = "Disount applied! £15 has been taken off your order.";
        expect(element(by.css('.discount-message')).getText()).toMatch(discountMessage);
      });

    });

  });

});
