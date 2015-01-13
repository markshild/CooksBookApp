json.extract! @recipe, :id, :title, :description, :servings, :cooking_time, :img_url, :created_at, :updated_at
json.picture_url asset_path(@recipe.picture.url)
json.tag_ids @recipe.tag_ids

json.author do
  json.extract! @recipe.user, :id, :name
end

if @recipe.favoriters.include?(current_user)
  json.favorited true
  json.favorite_id @current_favorite.id
else
  json.favorited false
end

json.favorites @recipe.favorites do |favorite|
  json.extract! favorite, :id
end


json.ingredients @recipe.ingredients do |ingredient|
  json.extract! ingredient, :id, :ingredient, :ord
end

json.tags @recipe.tags do |tag|
  json.extract! tag, :id, :name
end

json.directions @recipe.directions do |direction|
  json.extract! direction, :id, :step, :ord
end

json.comments @recipe.comments do |comment|
  json.extract! comment, :id, :body
  json.owner comment.user.name
  json.owner_id comment.user.id
end
