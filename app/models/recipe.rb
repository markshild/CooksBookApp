class Recipe < ActiveRecord::Base
  validates :title, :cooking_time, :servings, presence: true
  belongs_to :user
  has_many :comments, dependent: :destroy
  has_many :ingredients, inverse_of: :recipe, dependent: :destroy
  has_many :directions, inverse_of: :recipe, dependent: :destroy
  has_many :join_tags, dependent: :destroy
  has_many :tags, through: :join_tags, source: :tag, inverse_of: :recipes
  has_many :favorites
  has_many :favoriters, through: :favorites, source: :user
end
