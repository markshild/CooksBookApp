class Recipe < ActiveRecord::Base
  include PgSearch

  validates :title, :cooking_time, :servings, presence: true

  belongs_to :user
  has_many :comments, dependent: :destroy
  has_many :ingredients, inverse_of: :recipe, dependent: :destroy
  has_many :directions, inverse_of: :recipe, dependent: :destroy
  has_many :join_tags, dependent: :destroy
  has_many :tags, through: :join_tags, source: :tag, inverse_of: :recipes
  has_many :favorites
  has_many :favoriters, through: :favorites, source: :user

  has_attached_file :picture, default_url: "yum.png"
  validates_attachment_content_type :picture, :content_type => /\Aimage\/.*\Z/

  pg_search_scope :tasty_search, against: [:title, :description], :associated_against => {
    :ingredients => :ingredient,
    :tags => :name
  }

  paginates_per 4

end
