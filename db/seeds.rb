# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
user1 = User.create(email: "test@test.com", name: "Michael", password: "password", password_confirmation: "password")
user2 = User.create(email: "test2@test.com", name: "Michelle", password: "password", password_confirmation: "password")
tag1 = Tag.create(name: "Appetizer")
tag2 = Tag.create(name: "Main Course")
tag3 = Tag.create(name: "Salad")
tag4 = Tag.create(name: "Dessert")
tag5 = Tag.create(name: "Drink")
tag6 = Tag.create(name: "Vegetarian")
tag7 = Tag.create(name: "Healthy")
tag8 = Tag.create(name: "Comfort")
recipe1 = Recipe.create(user_id: user1.id, title: "Apple Pie", description: "Delicious end to a meal!", servings: 6, cooking_time: 45, tag_ids: [tag4.id, tag6.id, tag8.id])
recipe2 = Recipe.create(user_id: user1.id, title: "Chocolate Milk", description: "Delicious drink!", servings: 1, cooking_time: 5, tag_ids: [tag4.id, tag6.id, tag5.id])
recipe3 = Recipe.create(user_id: user2.id, title: "Tuna Salad", description: "Easy to make and enjoy!", servings: 6, cooking_time: 10, tag_ids: [tag1.id, tag3.id, tag6.id])
ingredients1 = recipe1.ingredients.create([{ingredient: "6 apples", ord: 0}, {ingredient: "1 pie crust", ord: 1}, {ingredient: "1 cup sugar", ord: 2}])
ingredients2 = recipe2.ingredients.create([{ingredient: "1 oz chocolate Syrup", ord: 0}, {ingredient: "7 oz milk", ord: 1}])
ingredients3 = recipe3.ingredients.create([{ingredient: "3 cans tuna", ord: 0}, {ingredient: "4 tbsp mayonnaise", ord: 1}, {ingredient: "2 stalks celery", ord: 2}])
directions1 = recipe1.directions.create([{step: "Slice apples into wedges after removing cores", ord: 0}, {step: "Place apples into crust, add sugar", ord: 1}, {step: "Bake in oven at 375 degrees for 45 minutes, or until golden brown", ord: 2}])
directions2 = recipe2.directions.create([{step: "Add milk and syrup into a tall glass", ord: 0}, {step: "Stir well with spoon", ord: 1}])
cirections3 = recipe3.directions.create([{step: "Open tuna cans and scoop out tuna into large bowl", ord: 0}, {step: "Chop celery finely, add to bowl", ord: 1}, {step: "Add mayonnaise, stir until well distibuted", ord: 2}, {step: "Serve and Enjoy!", ord: 3}])
