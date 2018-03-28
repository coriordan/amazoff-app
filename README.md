# Assignment 1 - ReactJS app.

Name: Cathal O'Riordan

## Overview.

My application is called Amazoff. Based on the popular online shopping website Amazon.com, the app. recreates the 
shopping cart experience whereby a user can browse a selection of book titles, add books to the shopping cart and 
finally purchase the contents of the cart in the 'checkout' page.

+ Browse book titles
+ Add to shopping cart
+ Remove from shopping cart
+ View cart sub-total
+ Increase or decrease quantity of item in shopping cart
+ View a book
+ Sort book catalogue by title, price or author
+ Select version of book to purchase (Kindle, Hardback, Paperback)
+ Select shipping option
+ Complete purchase confirmation

## Installation requirements.
+ ReactJS v16.2.0
+ Bootstrap 4
+ create-react-app tool
+ superagent v3.8
+ React Router v4.2
+ React Scripts v1.1 

To install run npm install followed by npm start

## Data Model Design.

Diagram of app's data model (see example below) AND/OR a sample of the test data used (JSON or equivalent).

![][image1]

## App Component Design.

![][image2]

Home & BookDetail component hierarchies

![][image3]

Checkout & Complete component hierarchies

## UI Design.

![][image4]

Main app. screen

![][image5]

Shopping cart displaying some added items

![][image6]

Viewing a book, with the Kindle edition selected for purchase (not added to cart)

![][image7]

Order checkout page with order summary and selected shipping option displayed

![][image8]

Order confirmation page

## Routing.

+ / - displays site index; best seller listing
+ /book/:id - displays an individual book; bookdetail page
+ /checkout - displays the shopping cart checkout page; finalise order and include shipping options
+ /complete - displays order confirmation and link back to site index

## Extra features

. . . . . Briefly explain any non-standard features, functional or non-functional (e.g. user registration, authentication) developed for the app . . . . . .  

## Independent learning.

. . . . . State the non-standard aspects of Angular (or other related technologies) that you researched and applied in this assignment . . . . .  

[image1]: ./model.png
[image2]: ./design1.png
[image3]: ./design2.png
[image4]: ./screen.png
[image5]: ./screen2.png
[image6]: ./screen3.png
[image7]: ./screen4.png
[image8]: ./screen5.png