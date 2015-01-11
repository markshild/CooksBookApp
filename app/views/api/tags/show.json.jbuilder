
json.extract! @tag, :id, :name
json.recipes @recipes do |recipe|
  json.extract! recipe, :title, :id
end
