class Ingredient < ActiveRecord::Base
  validates :ingredient, :recipe, presence: true

  belongs_to :recipe

  default_scope { order(:ord) }
end
