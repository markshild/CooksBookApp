json.array! @recipes do |recipe|
  json.extract! recipe, :id, :title
end
