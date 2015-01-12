json.array! @tags do |tag|
  json.extract! tag, :id, :name
  json.recipes tag.recipes do |recipe|
    json.extract! recipe, :id, :title
    json.picture_url asset_path(recipe.picture.url)
  end
end
