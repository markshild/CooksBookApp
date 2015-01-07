class Comment < ActiveRecord::Base
  validates :user_id, :recipe_id, :body, presence: true


  belongs_to :user
  belongs_to :recipe
end
