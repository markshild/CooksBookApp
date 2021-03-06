json.extract! @recipe, :id, :title, :description, :servings, :cooking_time, :created_at, :updated_at
json.picture_url asset_path(@recipe.picture.url)
json.tag_ids @recipe.tag_ids

json.array! @recipe do |tag|
  json.extract! tag, :id, :name
end

json.author do
  json.extract! @recipe.user, :id, :name
end

json.tags @tags do |tag|
  json.extract! tag, :id, :name
end

json.ingredients @recipe.ingredients do |ingredient|
  json.extract! ingredient, :id, :ingredient, :ord
end

json.directions @recipe.directions do |direction|
  json.extract! direction, :id, :step, :ord
end

json.comments @recipe.comments do |comment|
  json.extract! comment, :id, :body
  json.owner comment.user.name
  json.owner_id comment.user.id
end
