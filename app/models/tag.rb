class Tag < ActiveRecord::Base
  validates :name, presence: true

  has_many :join_tags
  has_many :recipes, through: :join_tags, source: :recipe
end
