json.recipes @recipes do |recipe|
  json.extract! recipe, :id, :title, :img_url
end
