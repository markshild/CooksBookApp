class Favorite < ActiveRecord::Base
  validates :recipe_id, :user_id, presence: true
  validates :recipe_id, :uniqueness => { :scope => :user_id }
  belongs_to :user
  belongs_to :recipe
end
