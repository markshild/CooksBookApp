
json.extract! @tag, :id, :name
json.recipes @recipes do |recipe|
  json.extract! recipe, :title, :id
  json.picture_url asset_path(recipe.picture.url)
end
