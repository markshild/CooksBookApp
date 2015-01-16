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

  has_attached_file :nutrition, default_url: "nonutrition.jpg"
  validates_attachment_content_type :nutrition, :content_type => /\Aimage\/.*\Z/

  after_validation :get_nutrition

  pg_search_scope :tasty_search, against: [:title, :description], :associated_against => {
    :ingredients => :ingredient,
    :tags => :name
  }

  paginates_per 4

  require 'addressable/uri'

  def get_nutrition

    begin
      ingredients = self.ingredients.map{|ing| ing.ingredient}.join(" + ")

      wolfram_url = Addressable::URI.new(
      scheme: 'http',
      host: 'api.wolframalpha.com',
      path: 'v2/query',
      query_values: {
        appid: 'PJ8EYG-Q8EEU3PP65',
        input: ingredients,
        podtitle: "Total nutrition facts"
      }
      ).to_s # needs to_s because RestClient only takes strings
      puts wolfram_url
      wolfram_response = RestClient.get(wolfram_url)
      doc = Nokogiri::Slop(wolfram_response)
      img_url = doc.queryresult.pod.subpod.img["src"]
      puts img_url
      nutrition = open(img_url)

      self.nutrition = nutrition
      # self.save if self.valid?
    rescue NoMethodError
    end
    nil
  end
end
