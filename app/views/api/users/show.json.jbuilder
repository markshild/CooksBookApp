json.extract! current_user, :name

json.favorites current_user.favorite_recipes do |recipe|
  json.extract! recipe, :id, :title
  json.picture_url asset_path(recipe.picture.url)
end


json.recipes current_user.recipes do |recipe|
  json.extract! recipe, :id, :title
  json.picture_url asset_path(recipe.picture.url)
end
