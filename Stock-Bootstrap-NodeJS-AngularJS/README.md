# Description
A webpage that allows users to search for stock information using the Alpha Vantage API and display the results on the same page below the form.<br>
In this work we create a Node.js script to return JSON formated data to the front-end. The client will parse the JSON data and render it in a nicer-looking responsive UI, using the Bootstrap toolkit.
A user will first open a page as shown below, where he/she can enter the stock symbol. A quote on a matched stock symbol can be performed.<br>
Once the user has entered some characters in the edit box and selected a matching result from the autocomplete list, he would click on Get Quote, at which point validation must be done to check that the entered data is valid. Once the validation is successful, the JQuery/Angular function ajax() is executed to start an asynchronous transaction with a Node.js script running on our AWS, and passing the search form data as parameters of the transaction.<br>

# Implementation Details
The top-level interface consists of the following:<br>
o A form which has an input to enter the stock symbol;<br>
o A result area that displays the results of a quote request or a list of favorite stocks; o Both sec;ons should be separated graphically.<br>
o The result area should start with an empty favorite list.<br>
The search form has two buttons:<br>
1. Get Quote button: On the button being clicked, validations are performed. If validations are successful, then an AJAX request is made to your web server (Node.js on AWS) providing it with form data that was entered. If validations fail, appropriate messages must be displayed under the appropriate text box, and an AJAX request should NOT be made with invalid data. Note that the “Get Quote” bu]on should be disabled when the input box is empty or contains only spaces.<br>
2. Clear button: This button must clear the text field, reset the result area to the favorite list and clear all validation errors if present. The clear operation is implemented as a JavaScript function.<br>
<br><br><br>

Validation:<br>
• The validations that are needed to be implemented in the input query string (stock symbol) are:<br>
o Empty Entry – the border turns red when the input is empty or contains only spaces<br>
o Input error message: show the error message when the input is empty or contains only<br>

<br><br><br>
Result Tabs:<br>
The result area will include a sliding mechanism which is implemented with Angular.<br>
• There should be two sections, which can be “toggled” using a sliding mechanism.<br>
o The first section should be the Favorite List.<br>
o The second section should be the Stock Details and charts.<br>

# ScreenShots

## Initial page
![image](https://user-images.githubusercontent.com/13664720/50809685-14946f80-12ba-11e9-985c-d1f55f7a225e.png)

## Auto complete
![image](https://user-images.githubusercontent.com/13664720/50809723-72c15280-12ba-11e9-991e-d6e35b073501.png)

## Current stock details
![image](https://user-images.githubusercontent.com/13664720/50809772-a9976880-12ba-11e9-9f6c-a93c4b5f9251.png)

## Historical chart details
![image](https://user-images.githubusercontent.com/13664720/50809801-c764cd80-12ba-11e9-98c3-d42608d6911a.png)

## News Feed details
![image](https://user-images.githubusercontent.com/13664720/50809802-c92e9100-12ba-11e9-803c-e32eb46b2aa8.png)

## Responsive design
![image](https://user-images.githubusercontent.com/13664720/50809805-cc298180-12ba-11e9-93dd-4a36ce0eaca2.png)

