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
    @recipe = current_user.recipes.new(recipe_params)
    ingredient_params.each.with_index do |(ord_val, ingredient_val), index|
      @recipe.ingredients.new({ord: index, ingredient: ingredient_val})
    end

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

    transaction do
      @recipe.ingredients.each do |ingredient, index|
        ingredient.ingredient = ingredient_params[index.to_s]
      end
    end

    if @recipe.update(recipe_params)
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

  def ingredient_params
    params.require(:ingredient)
  end
end
