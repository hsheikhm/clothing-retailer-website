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

## Directory Structure

```
├── app/
│   ├── css/
│   ├── img/   
│   ├── partials/  
│   ├── products/   
│   ├── js/   
│   │   ├── app.js
│   │   ├── controllers.js
│   │   ├── directives.js
│   │   └── services.js
│   └── index.html
│   
├── test/
│   ├── e2e/
│   │   └── scenarios.js
│   ├── unit/  
│   │    └── controllersSpec.js
│   ├── karma.conj.js
│   └── protractor-conf.js
│
```

## App Usage and Features

***User can view all 6 categories:***

![Home Page](https://github.com/hsheikhm/Github-Images/blob/master/clothing-retailer-website/home-page.png)

***User can view a single category and add a product:***

![Category Page](https://github.com/hsheikhm/Github-Images/blob/master/clothing-retailer-website/category-page.png)

***User cannot add a product that is out of stock:***

![Out of Stock Product](https://github.com/hsheikhm/Github-Images/blob/master/clothing-retailer-website/out-of-stock-product.png)

***User can view their shopping cart, see the total price, and remove a product:***

![Shopping Cart Page](https://github.com/hsheikhm/Github-Images/blob/master/clothing-retailer-website/shopping-cart-page.png)

***User can apply a voucher which gives them a discount:***

![Apply Voucher](https://github.com/hsheikhm/Github-Images/blob/master/clothing-retailer-website/apply-voucher.png)

## Download Instructions

Follow the below instructions on your terminal to use the website:

```
$ git clone https://github.com/hsheikhm/clothing-retailer-website.git
$ cd clothing-retailer-website
$ npm install
$ bower install
$ npm start
(On your browser visit: http://localhost:8000/app/#/home)

```

Below are the codes to be entered when you wish to test using the vouchers:

Code for £5 off voucher: 001
Code for £10 off voucher when spent over £50: 002
Code for £15 off voucher when spent over £75 and ordered a foot-wear item: 003

#### Author: [Hamza Sheikh](https://github.com/hsheikhm)
