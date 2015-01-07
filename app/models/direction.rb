class Direction < ActiveRecord::Base
  validates :step, :recipe, presence: true

  belongs_to :recipe

  default_scope { order(:ord) }
end
