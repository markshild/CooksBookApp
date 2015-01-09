
json.extract! @comment, :id, :body
json.owner @comment.user.name
json.owner_id @comment.user.id
