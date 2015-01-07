# MY FINAL PROJECT

For my final project, I will be doing a clone of the [Yummly](http://www.yummly.com/) website. This is a recipe sharing website where users can upload their own recipes as well as find and store other users recipes.

## FEATURES:
* Users/Auth
* Recipes
* Comments
* Tags
Up to this point is the MVP
* Search
* Favorite Recipes
* Advanced Search
* Notifications
* Email Confirmation and Password Recovery
* Nutrition Information
* Printable Recipe Page


## DB SCHEMA:
### Users:
Name - string
Email - string
Password_digest - string
img_url - string

### Session:
Session_Token - string
user_id - integer

### Recipes:
Title - string
Description - text
user_id - integer
Servings - integer
cooking_time - integer
img_url - string

### Comments:
recipe_id - integer
user_id - integer
body - text

### Ingredients:
recipe_id - integer
ingredient - string
ord - integer

### Steps:
recipe_id - integer
step - string
ord - integer

### Tags:
name - string

### Favorites Join Table:
recipe_id - integer
favoriter_id - integer
(put a uniqueness constraint on both columns together)

### Tag-Recipe Join Table:
tag_id - integer
recipe_id - integer
