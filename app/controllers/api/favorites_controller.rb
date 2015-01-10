class Api::FavoritesController < ApplicationController
  def create
    @favorite = Favorites.new(favorite_params)
    @favorite.user_id = current_user.id

    if @favorite.save
      render :show
    else
      render json: @favorite.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    favorite = Favorite.find(params[:id])
    favorite.destroy
    render json: {}
  end

  private
  def favorite_params
    params.require(:favorite).permit(:recipe_id)
  end
end
