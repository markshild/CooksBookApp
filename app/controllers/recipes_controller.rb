class RecipesController < ApplicationController


  def index
    @recipes = Recipe.all
  end

  def show
    @recipe = Recipe.find(params[:id])
  end

  def new
    @recipe = Recipe.new
  end

  def create
    @recipe = Recipe.new(recipe_params)
    @recipe.user_id = current_user.id
    if @recipe.save
      redirect_to recipe_url(@recipe)
    else
      flash.now[:errors] = @recipe.errors.full_messages
      render :new
    end
  end

  def edit
    @recipe = Recipe.find(params[:id])
  end

  def update
    @recipe = Recipe.find(params[:id])
    if @recipe.update_attributes(recipe_params)
      redirect_to recipe_url(@recipe)
    else
      flash.now[:errors] = @recipe.errors.full_messages
      render :edit
    end
  end

  def destroy
    recipe = Recipe.find(params[:id])
    recipe.destroy
    redirect_to recipes_url
  end

  private
  def recipe_params
    params.require(:recipe).permit(:title, :description, :servings, :img_url, :cooking_time)
  end
end
