# CooksBook

This is a recipe sharing web app where users can upload their own recipes as well as find and store other users' recipes.

Recipes contain nested ingredients, directions and comments, allowing for user inputs and variable counts for each. Interaction with Wolfram Alpha's API allows users to see nutritional information on recipes based on the ingredients entered. Facebook authentication allows users to sign in with their Facebook accounts in lieu of signing up.

Users can upload an image of their recipe which I store in Amazon's S3 Cloud storage (keys hidden of course). Users can favorite a recipe, adding it to their list of favorites as well as increasing the favorites count for that recipe.

The Wolfram Alpha API tends to be finicky. I am trying to figure out a way to make it return consistent results. I will update if I can figure it out.

Technologies used include Ruby, Javascript, Rails, Backbone, jQuery, SQL, XML, CSS, HTML, as well as gems such as BCrypt, Nokogiri, PGsearch, Kaminari and many more.  

All features are listed below. Enjoy! 

## FEATURES:
* Users/Auth
* Multiple Sessions per User
* Recipes
* Comments
* Tags
* Search
* Uploadable images stored in Amazon's S3 cloud storage
* Favorite Recipes
* Nutrition Information
* Facebook Authentication
