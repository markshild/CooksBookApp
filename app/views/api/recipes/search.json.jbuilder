json.pages do
  json.page @recipes.current_page
  json.last_page @recipes.last_page?
  json.first_page @recipes.first_page?
end

json.recipes do
  json.array! @recipes do |recipe|
    json.extract! recipe, :id, :title
    json.picture_url asset_path(recipe.picture.url)
  end
end
