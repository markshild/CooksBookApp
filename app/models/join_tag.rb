class JoinTag < ActiveRecord::Base
  validates :tag_id, :recipe, presence: true

  belongs_to :tag
  belongs_to :recipe
end
