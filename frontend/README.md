# SurBing(Team11) - Sprint1

## Project Abstract
This service is intended for users who want to obtain, compare, or share their survey results. SurveyMonkey and KOSIS are similar to our service, but we are different in that SurveyMonkey only helps users to conduct the survey. Also we are a private institution, so unlike KOSIS, we can get a narrower and more detailed answer. How to use (service) is as follows: first you should go through the login screen to use the page. You will then be able to search for the survey you want to find on the main screen, and you can click on the survey to view the details. You can go to the shopping cart page to download it, and you can also check the similarities between the survey items. You must upload the csv file of the survey to post the survey. If personal information is included, warning will be shown.

## Document Revision History
`Rev. 1.0 2019-10-05 - initial version`

## Customer
Survey results are required in broad fields from marketing to academic researches in order to analyze the public and society. So anyone who wants to obtain the survey results easily would be our main customer. They would search for a website which provides survey results done by private or public organizations and that would be our website.


## Competitive Landscape
### `Survey Monkey`

* Survey monkey is a site where users can create survey sheets conveniently because this site has many types of items and users can modify design according to their preference. On the other hand, SurBing can collect existing survey results and provide them to those who want to conduct the same survey. Our site is specialized in the function of searching system and selecting and displaying survey items which has similar contents.

### `KOSIS`

* KOSIS has a wide range of public survey, such as census and occupational surveys. In contrast, SurBing targets private survey. In other words, users can gather survey results about a narrow range of subjects, such as surveys for college students for assignments. Using Surbing, if there are existing survey results on the same topic, users can get them without redoing the survey.

## User Stories

### `Log In`
* Actors: All site user
* Precondition: The user has to be registered
* Trigger: User is at the login/signup page
* Scenario:
  1. The page displays a form with two fields "ID" and "Password". Below the form, there is "Log In" button
  2. The User fills out the two fields with his/her login information
* Exceptions & Required Behaviors:
  1. The user does not fill out all fields to log in
     * Pop up an alert "Please fill in the missing fields."
  2. The user fills inappropriate ID or Password
     * Pop up an alert "Incorrect ID or Password." and empty the filled text
* Acceptance Test: \
Given the user has filled out appropriate login information \
When the user clicks on the "Log in" Button \
Then the user should see "Successfully Logged In!"

### `Sign up`
* Actors: All site user
* Precondition: The user has to be not registered yet
* Trigger: User is at the login/signup page
* Scenario:
  1. The page displays a form with four fields "E-mail", "ID", "Password" and "Password Confirmation". Below the form, there is "Sign up" button
  2. The User fills out the four fields with his/her E-mail, ID and preferred password
* Exceptions & Required Behaviors:
  1. The user does not fill out all fields to Sign up
     * Pop up an alert "Please fill in the missing fields."
  2. There is a duplicated E-mail or ID in previously registered accounts
     * Pop up an alert "There is duplicated E-mail or ID." and empty the filled text
  3. The user fills out the password Confirmation and password differently
     * Pop up an alert "Incorrect Password confirmation." and empty the filled text
* Acceptance Test: \
Given the user has filled out appropriate Sign up information. \
When the user clicks on the "Sign in" Button \
Then the user should see "Successfully Registered!"

### `Log out`
* Actors: Site users logged in
* Precondition: The user has to be logged in
* Trigger: User clicks the log out button on the my ID
* Scenario:
  1. Pop up the message “Do you really want to log out?”
  2. The user clicks yes, then be logged out
* Exceptions & Required Behaviors:
  1. If the user is doing some work when clicking the button, that work will be quit
* Acceptance Test: \
  When the user clicks on the “log out” button \
  then the user should see pop up message \
  Click yes, then the user will be logged out


### `Go to Cart`
* Actors: All site user
* Precondition: The user has to be registered
* Trigger: User clicks the Profile button at the right top
* Scenario:
  1. Below the button, "My Cart" and "Log Out" buttons appears
  2. The User Clicks "My Cart" button
* Exceptions & Required Behaviors:
  * no expected exceptions
* Acceptance Test: \
  When the user clicks on the "My Cart" button \
  Then the user should see "Cart" page

### `Return to Home`
* Actors: Site user that navigated other pages in the site
* Precondition: The user has to be registered
* Trigger: User is at the other page(ex: search for survey, cart, survey information tab, Home... )
* Scenario:
  1. On one side of pages, there is button for going home
  2. The User clicks the button
* Exceptions & Required Behaviors:
 The operations that were going on stop and the page moves to Home
* Acceptance Test: \
 Given the user is at page excluding login page \
 When the user clicks on the Button to home, then the user should see page ‘Home’

### `Upload Survey Results`
* Actors: Site users who have registered
* Precondition: The user has to be registered, and has to be at home page.
* Trigger: User clicks on survey upload button
* Scenario:
  1. At home or search page, there is a survey upload button.
  2. The user clicks the button and moves to the upload page.
  3. User continues few steps in order to upload the survey.
* Exceptions & Required Behaviors:
  1. If the user clicks on the upload button on the main page, user moves onto the upload page. 
  2. Firstly the user uploads .cvs file and website automatically analyze the file.
  3. Secondly the user must check the items of the survey which does not include personal informations. The website colors the item in red if the item’s question contains some keywords like ‘phone number’ or ‘name’ or ‘address’ etc.
  4. Finally user must click on the checkbox which warns the user if the checked survey items don’t include personal information.
  5. The survey is uploaded and user moves to the main page.
* Acceptance Test: \
Push the survey upload button and check if the page redirects into upload page. Then upload the .cvs file and check if the items are listed on the page well in a few second. Check if the items containing personal information are colored in red. After clicking on all personal information free items, look if the submit button doesn’t works while the final checkbox(the checkbox explained on ‘required behaviors iv’ .) is not checked. Finally check if the page moves onto main page and my survey is successfully uploaded.  

### `Filter Searched Results`
* Actors: All site user
* Precondition: The user has searched for survey
* Trigger: User is at Search result page
* Scenario:
  1. At the left column of the page, there are two text forms for each filtering criteria (Response number, etc...)
  2. User fills out the range value for each criteria (leave empty for unlimited)
  3. User clicks the "Apply" button at the bottom
* Exceptions & Required Behaviors:
  1. The start value is bigger than end value in certain criteria
    * Shows up a red message "Please check the range of the value" under corresponding criteria
* Acceptance Test: \
Given that the user filled out some of (can be none/all of) the range value for filtering criteria \
When the user clicks on the "Apply" Button \
Then the user should see all the search results matching with the criteria \
And should not see any search results not matching with the criteria

### `See Survey Information Tab`
* Actors: Site users who wants to see survey details and items
* Precondition: The user has to be at searched survey list page
* Trigger: User clicks the survey block
* Scenario:
  1. The user moves to the information tab about clicking survey
  2. Show the each of item results and details about the survey
* Exceptions & Required Behaviors:
  * No Exceptions
* Acceptance Test: \
When the user clicks on the survey block \
then the user should see information tab consisting of details and items

### `Add Survey to Cart`
* Actors: site users who wants to add surveys to cart
* Precondition: user has to be at searched survey list page
* Trigger: user clicks add to cart button
* Scenario:
1. User wants to add survey into his/her own cart.
2. User clicks the button on the right side of the survey block.
* Exceptions & Required Behaviors:
1. The item is added to cart with an alert message which informs that the item is successfully added.
2. If the survey is already in the cart, the alert message pops up to inform that.
3. User can move to his own cart by clicking the button on the right top corner of the website.
* Acceptance Test: \
On search result page, we can click on many survey’s add-to-cart button and finally go to the personal cart page and check if surveys are successfully added. 

### `Delete Surveys from Cart`
* Actors: Site users who wants to delete surveys
* Precondition: The user has to be at “Cart” page
* Trigger: User checks one or more boxes, then clicks delete button
* Scenario:
  1. User selects surveys which wants to delete by checking the boxes
  2. Checking boxes, user clicks delete button
  3. The surveys disappear from the cart list
  4. Pop up the message “Done!”
* Exceptions & Required Behaviors:
  1. If user doesn’t select any checkboxes and clicks the delete button, then pop up “Please select surveys which you want to delete”
* Acceptance Test: \
  When the user clicks on delete button \
  then the user should see surveys deleted


### `Perform Relationship Analysis among Surveys in Cart`
* Actors: All site user
* Precondition: The user has at least two surveys in his/her cart
* Trigger: User is at Cart page
* Scenario:
  1. At the left side of each surveys in Cart, there is a check box corresponding to each survey
  2. User checks from two to ten surveys in his/her Cart
  3. User clicks on "Analysis" button
* Exceptions & Required Behaviors:
  1. There is no relevant results to show
    * Show message "No Relevant Items Found" where relevant result used to appear
  2. User selected too many surveys
    * Shows up an alert message "Please select at most 10 items"
* Acceptance Test: \
Given that the user selected 2~10 surveys in his cart \
When the user clicks on the "Analysis" button \
Then the user should see relevant survey item pairs at the left side of the page \
And the results should be sorted in decreasing order of similarity

### `Download Survey Result from Information Tab`
* Actors: site users who wants to download a single survey result
* Precondition: user has to be at some survey’s detail page
* Trigger: user clicks download button
* Scenario:
1.  User wants to download a single survey result.
2. User clicks on the download button
* Exceptions & Required Behaviors:
1. The survey’s download starts with no alert.
* Acceptance Test: \
On survey detail page, we can click on the survey download button and check if the download starts.

### `Download all Selected Surveys from Cart`
* Actors: Site users who went in the 'CART' page
* Precondition: At the user’s own Cart, there has to be item to download. 
* Trigger: User clicks the download button.
* Scenario: User clicks the checkboxes of item to download.
 ( If you want to download all items in your cart, you can click “select all’ button instead of clicking all checkboxes of items. )
The user clicks ‘Download’ buttons at the right-side corner of page.
* Exceptions & Required Behaviors:
 1. Surveys that user put in the Cart are shown at the page. There is also checkbox that user can click. 
 2. If the user clicks the checkbox, \
the box is checked and the survey is added to the lists that will be download. 
 3. Then the csv file of the survey result is downloaded \
after user clickes ‘download’ button. 
* Acceptance Test: 
When user put some surveys to his/her Cart and go in, the surveys that user put has to be in cart.
If user checks survey to download and clicks ‘download’, the result file of survey has to be downloaded.
## User Interface Requirements

![Image](https://postfiles.pstatic.net/MjAxOTA5MzBfMTYy/MDAxNTY5ODU1MTI5Mjc2.Mg_XXXffDFUmOKviZrHudC8pS_YT5NirSeJolPxbIpkg.XCXMwo4tt1N6pVFesa8lTjGGoNgDoy6skzF43qWqJiAg.JPEG.stella990310/%EC%9D%B4%EB%A6%84_%EC%97%86%EB%8A%94_%EB%85%B8%ED%8A%B8%EB%B6%81_(1)-8.jpg?type=w773)
