describe('clothingApp', function() {

  it('should redirect index.html to index.html#/home', function() {
    browser.get('app/index.html');
    browser.getLocationAbsUrl().then(function(url) {
      expect(url).toEqual('/home');
    });
  });

  describe('Home page view', function() {

    beforeEach(function() {
      browser.get('app/index.html#/home');
    });

    it('should display all 6 available categories', function() {

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

  });

});
