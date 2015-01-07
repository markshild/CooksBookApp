class Recipe < ActiveRecord::Base
  validates :title, :cooking_time, :servings, presence: true
  belongs_to :user
  has_many :comments
end
