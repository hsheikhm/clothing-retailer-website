# Clothing Retailer Website

* [Task & User Stories](#task)
* [My Approach](#my-approach)
* [Directory Structure](#directory-structure)
* [App Usage and Features](#app-usage-and-features)
* [Download Instructions](#download-instructions)

## Task

The task was to build a **responsive website** for a **clothing retailer** that displays **6 categories** of clothes and that also shows a **shopping cart**. **Discount vouchers** could also be redeemed.

#### User Stories:

```
As a User
So that I can see what is on offer
I want to view all products, their category, price and availability

As a User
So that I can purchase a product
I want to add a product to my shopping cart

As a User
So that I can no longer purchase a product that I added
I want to remove a product from my shopping cart

As a User
So that I know how much I have to pay
I want to see the total price for the products in my shopping cart

As a User
So that I can receive a discount
I want to apply a voucher to my shopping cart

As a User
So that I can see how much of a discount I've received
I want to see confirmation of the discount applied

As a User
So that I know if I have entered an invalid voucher
I want to see confirmation that the voucher is invalid

As a User
So that I know if a product is out of stock
I want to see a message whenever I try to add an out-of-stock product to my cart
```

## My Approach

### Back-End

I decided to build this website using **AngularJS** since it is one of my favorite frameworks for building responsive websites. AngularJS makes it really simple to set up a project and structure your code, thanks to its **controllers, services** and **directives**. Another reason for choosing AngularJS was that the data used for this website was in small amounts therefore it wasn't necessary to use a framework like React, one that is widely used for data heavy websites.

I had created two [controllers](https://github.com/hsheikhm/clothing-retailer-website/blob/master/app/js/controllers.js), one for getting the **JSON data** and the other for **managing** the shopping cart. I had also refactored my code by creating two [services](https://github.com/hsheikhm/clothing-retailer-website/blob/master/app/js/services.js), one responsible for creating a **GET request** and the other responsible for **creating** the shopping cart.

Lastly I had configured all my **routes** and **dependencies** in the [app.js](https://github.com/hsheikhm/clothing-retailer-website/blob/master/app/js/app.js) file.

### Front-End / Styling

Once all the logic was complete I then moved onto styling the website. I had used **HTML, CSS** and **Bootstrap** to style the website. I even managed to integrate **Angular's ngAnimate** module to create some nice [animations](https://github.com/hsheikhm/clothing-retailer-website/blob/master/app/css/animations.css).

To make the website **responsive** I had set different css values to different [media screen sizes](https://github.com/hsheikhm/clothing-retailer-website/blob/master/app/css/app.css).

### Testing

I had completed and passed all [feature / e2e](https://github.com/hsheikhm/clothing-retailer-website/blob/master/test/e2e/scenarios.js) tests using **Protractor** and **Selenium**. As for unit testing I used **Karma-Jasmine**. Unfortunately I didn't have time to test all my controllers and services so my [unit testing](https://github.com/hsheikhm/clothing-retailer-website/blob/master/test/unit/controllersSpec.js) remains to be completed.





For Download Instructions remember to also provide the voucher codes.