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

Use meaningful sample data. Briefly explain any non-trivial issues.

## App Component Design.

A diagram showing the app's hierarchical component design (see example below). 

![][image2]

## UI Design.

. . . . . Screenshots of app's views (see example below) with appropriate captions (user regeneration and login views, if implemented, can be omitted) . . . . . . . 

![][image3]

Main app. screen

![][image4]

Shopping cart displaying some added items

![][image5]

Viewing a book, with the Kindle edition selected for purchase (not added to cart)

![][image6]

Order checkout page with order summary and selected shipping option displayed

![][image7]

Order confirmation page

## Routing.
. . . . List each route supported and state the associated view . . . . . 

+ /foos - displays all published foos
+ /foos/:id - detail view of a particular foo (:id)
+ etc
+ etc

## Extra features

. . . . . Briefly explain any non-standard features, functional or non-functional (e.g. user registration, authentication) developed for the app . . . . . .  

## Independent learning.

. . . . . State the non-standard aspects of Angular (or other related technologies) that you researched and applied in this assignment . . . . .  



[image1]: ./model.png
[image2]: ./design.jpg
[image3]: ./screen.png
[image4]: ./screen2.png
[image5]: ./screen3.png
[image6]: ./screen4.png
[image7]: ./screen5.png