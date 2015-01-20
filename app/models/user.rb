class User < ActiveRecord::Base
  validates :email, :password_digest, :name, presence: true
  validates :email, uniqueness: true
  validates :password, confirmation: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validate :confirmation_on_signup

  attr_reader :password

  has_many :recipes
  has_many :sessions
  has_many :comments, dependent: :destroy
  has_many :favorites
  has_many :favorite_recipes, through: :favorites, source: :recipe

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil unless user && user.valid_password?(password)
    user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def self.find_or_create_by_auth_hash(auth_hash)
    user = User.find_by(
    provider: auth_hash[:provider],
    uid: auth_hash[:uid])

    if user.nil?
      pass = SecureRandom::urlsafe_base64
      user = User.create!(
      name: auth_hash[:info][:name],
      email: auth_hash[:info][:email],
      password: pass,
      password_confirmation: pass,
      provider: auth_hash[:provider],
      uid: auth_hash[:uid])
    end

    user
  end

  private
  def confirmation_on_signup
    if !self.persisted? && !self.password_confirmation.present?
      errors[:password_confirmation] << "can't be blank"
    end
  end

end
