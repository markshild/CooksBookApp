class Recipe < ActiveRecord::Base
  validates :title, :cooking_time, :servings, presence: true
  belongs_to :user
  has_many :comments, dependent: :destroy
  has_many :ingredients, dependent: :destroy
end
