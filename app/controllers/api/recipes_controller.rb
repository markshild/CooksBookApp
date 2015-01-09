class Api::RecipesController < ApplicationController
  before_action :require_signed_in!, only: [:new, :create, :edit, :update, :destroy]

  def index
    @recipes = Recipe.all
  end

  def show
    @recipe = Recipe.find(params[:id])
  end

  def new
    @recipe = Recipe.new
    @recipe.ingredients.new(ord: 0)
    @recipe.directions.new(ord: 0)
    @tags = Tag.all
    render :form
  end

  def create
    @recipe = current_user.recipes.new(recipe_params)

    Recipe.transaction do
      ingredient_params.keys.each do |key|
        @recipe.ingredients.new({ord: ingredient_params[key]['ord'], ingredient: ingredient_params[key]['name']})
      end

      direction_params.keys.each do |key|
        @recipe.directions.new({ord: direction_params[key]['ord'], step: direction_params[key]['name']})
      end
    end

    if @recipe.save
      render show: @recipe 
    else
      flash.now[:errors] = @recipe.errors.full_messages
      @tags = Tag.all
      render :new
    end
  end

  def edit
    @recipe = Recipe.find(params[:id])
    @tags = Tag.all
  end

  def update
    @recipe = Recipe.find(params[:id])

    Recipe.transaction do

      @recipe.ingredients.each do |ingredient|
        ingredient.destroy
      end
      ingredient_params.keys.each do |key|
        @recipe.ingredients.new({ord: ingredient_params[key]['ord'], ingredient: ingredient_params[key]['name']})
      end

      @recipe.directions.each do |direction|
        direction.destroy
      end

      direction_params.keys.each do |key|
        @recipe.directions.new({ord: direction_params[key]['ord'], step: direction_params[key]['name']})
      end
    end

    if @recipe.update(recipe_params)
      redirect_to recipe_url(@recipe)
    else
      flash.now[:errors] = @recipe.errors.full_messages
      @tags = Tag.all
      render :edit
    end
  end

  def destroy
    recipe = Recipe.find(params[:id])
    recipe.try(:destroy)
    redirect_to recipes_url
  end

  private
  def recipe_params
    params.require(:recipe).permit(:title, :description, :servings, :img_url, :cooking_time, tag_ids: [])
  end

  def ingredient_params
    params.require(:ingredient)
  end

  def direction_params
    params.require(:direction)
  end
end
