class Recipe < ActiveRecord::Base
  validates :title, :cooking_time, :servings, presence: true
  belongs_to :user
  has_many :comments, dependent: :destroy
  has_many :ingredients, inverse_of: :recipe, dependent: :destroy
  has_many :directions, inverse_of: :recipe, dependent: :destroy
  has_many :join_tags
  has_many :tags, through: :join_tags, source: :tag, inverse_of: :recipes
end
