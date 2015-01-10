class Favorite < ActiveRecord::Base
  validates :recipe_id, :user_id, presence: true
  belongs_to :user
  belongs_to :recipe
end
