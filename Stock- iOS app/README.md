# Description
Developed an Android Mobile application, which allows users to search for stock information, save some stock symbols as favorites, and post to the Facebook timeline. You should reuse the backend service (node.js script).<br>
The main “scene” of this app is like where the user can enter the stock ticker symbol and select from a list of matching stock symbols using “autocomplete.” A “stock quote” on a matched stock symbol can be retrieved.<br>
Once the user has entered some characters in the edit box and selected a matching result from the autocomplete list, he/she would click on Get Quote, at which point validation must be done to check that the entered data is not empty.<br>
Once the validation is successful, we would get the stock details using our node.js script hosted on Amazon Web Services, which would return the result in JSON format. We would display the stock details in a ListView component in the ‘Current’ tab.<br> Furthermore, our node.js script would be responsible for rendering the HighCharts in the ‘Current’ and ‘Historical’ tabs and also rending the news articles in the ‘News’ tab.<br>

# Implementation Details
### Search Form
You must replicate the Search Form.<br>
The interface consists of the following:<br>
• An ‘AutoCompleteTextView’ component allowing the user to enter the company
name or symbol.<br>
• Two TextViews implemented as buttons for interaction in the Search Form.<br>
• A button ‘Clear’ to clear the ‘AutoCompleteTextView’ component.<br>
• A button ‘Get Quote to get the quote, after validation.<br>
• A Switch implemented as an AutoRefresh element<br>
• Next to the switch, an Android icon to refresh on-click.<br>
• A Spinner listing options to sort the list.<br>
• A Spinner listing options to order the list.<br>
• The Favorite ListView showing the list of favorite stocks.<br>
• The Favorite List starts with an empty favorite list.<br>
The form has two buttons:<br>
a) Get Quote: Validations are first performed, when the button is clicked. If the validations are successful, then the stock details would be fetched from the server (either hosted on AWS). However, if the validations are unsuccessful, appropriate messages would be displayed and no further requests would be made to the server.<br>
b) Clear: This button would clear the ‘AutoCompleteTextView’ and clear any validations error, if present.<br>

#####  AutoComplete
he user can enter the stock name or symbol in the text view to get the stock information from our PHP script. Based on the user input, the AutoComplete would display the all the matching companies and symbols by making a HTTP request. The auto-complete dropdown is shown only when the user has typed in at least one character and the maximum number of results displayed in the auto-complete dropdown is 5. This needs to be implemented using AutoCompleteTextView.<br>
To get the data used for auto-complete suggestions, you need to make http requests to your Node.js script which is in AWS.<br>
If the user selects one of the results from the auto-complete dropdown, the content of the result (symbol with the company name) should be copied to the input field and the autocomplete dropdown then disappears.<br>
If the user taps on an area other than the auto-complete form, the dropdown should be hidden.<br>
![image](https://user-images.githubusercontent.com/13664720/50810606-46f49b80-12bf-11e9-95c4-16497934495f.png)
![image](https://user-images.githubusercontent.com/13664720/50810626-6390d380-12bf-11e9-89a2-3b791deae4c0.png)
##### Validations<br>
The validation for empty symbol entry needs to be implemented. If the user does not enter anything in the ‘UITextField’ or just enters some empty spaces, when he presses the Get Quote button an appropriate message to indicate the error should be displayed.<br>
##### Get Quote Execution<br>
Once the validation is successful, you should execute an HTTP request to the Node.js script which is hosted on AWS, and then navigate to the details page about the requested stock.<br>
### Favorite List<br>
The Favorites list interface consists of the following:<br>
• An Automatic Refresh switch, labeled AutoRefresh<br>
• A Refresh button<br>
• Two “Spinners” controlling the order of the list<br>
• The Favorite “Custom ListView” showing a list of favorite stocks<br>
The stocks in the user’s Favorites list would be displayed in a list.<br>
Here are some important points about this feature:
• Display symbol, stock price and change (change percent) in each row.
• Sort by Default/Symbol/Price/Change/Change (%) in Ascending/Descending order
• See Homework 8 about the behavior of the AutoRefresh switch and refresh button
• Whenever the favorite list appears or re-appears, the price and change (change percent) data need to be updated. But the symbols should always be stored in “local device” storage.
• Display an ‘activity indicator’ while loading data from server.
• Display a proper error message if failing to update one or more stocks in the favorite list.
• Select a row to search that stock and navigate to the stock detail page.
• Slide cell row and display a Context Menu to Delete list item. Then user can then remove that stock from the Favorites list.

### Stock Details
When the user clicks the Get Quote button, your app should display a loading image before you are ready to show the stock details view. The Stock Details section should be designed as per Figure 9.
The stock detail section should have 3 views:
• Current Stock • Historical Charts 
• News Feeds
You can use a “Tabbed Activity” to navigate between 3 views above. The back button in the header should navigate back to the Search Form.
The Stock Details would be starting with the ‘Current’ view as loaded by default. Furthermore, the stock details would have a list showing all the stock values. The list of the items in the stock details would be implemented using a ‘ListView’.
The following stock values should be displayed: Stock Symbol, Last Price, Change, Timestamp, Open, Close, Day’s Range, Volume.
The meaning of these values is the same as in Stock web app.
![image](https://user-images.githubusercontent.com/13664720/50810729-fdf11700-12bf-11e9-8e8e-78d76b13f16f.png)

Below the list of stock details, you need to show the indicator choices and the high chart image, as shown in Figure. The user will need to scroll down to see these areas. A Spinner and a TextView/Button labeled Change are used to choose another indicator and change the high chart image. Here are some points:
• Include all the indicators and the chart is about the price/volume at the beginning.
• The Change button is only enabled if a different indicator is selected.
• You should use a “WebView” to display the chart and reuse some of your HTML and JavaScript code from previous homeworks. But you should figure out a way to communicate between your Android code and the JS code asynchronously. It’s NOT allowed to block the app while waiting for the chart to be shown in the WebView.
• Whenever the chart in the WebView is in a loading state, you should hide the previous chart (if there’s any) and display a loading icon.
• Display a proper message if there is any failure in retrieving a chart.
![image](https://user-images.githubusercontent.com/13664720/50810771-31cc3c80-12c0-11e9-9bda-c1aa99110502.png)
![image](https://user-images.githubusercontent.com/13664720/50810787-4ad4ed80-12c0-11e9-956a-a4b57658eb9d.png)
![image](https://user-images.githubusercontent.com/13664720/50810785-47416680-12c0-11e9-9a00-af414c07f451.png)
