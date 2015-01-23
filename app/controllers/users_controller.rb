class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def guest
    @user = User.new({name: "Guest", password: "password",
      password_confirmation: "password", email: SecureRandom.urlsafe_base64 })
    @user.save
    sign_in(@user)
    redirect_to root_url
  end

  private
  def user_params
    params.require(:user).permit(:password, :email, :name, :password_confirmation)
  end
end
