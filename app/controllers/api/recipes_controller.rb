class Api::RecipesController < ApplicationController
  before_action :require_signed_in!, only: [:new, :create, :edit, :update, :destroy]

  wrap_parameters false

  def index
    @tags = Tag.joins(:join_tags).group('tag.id').order('COUNT (join_tags.tag_id) DESC').limit(3)
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
      ingredient_params.each_with_index do |ing, index|
        next if ing.blank?
        @recipe.ingredients.new({ord: index, ingredient: ing})
      end

      direction_params.each_with_index do |step, index|
        next if step.blank?
        @recipe.directions.new({ord: index, step: step})
      end
    end

    if @recipe.save
      render :show
    else
      flash.now[:errors] = @recipe.errors.full_messages
      @tags = Tag.all
      render json: {}
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
      ingredient_params.each_with_index do |ing, index|
        next if ing.blank?
        @recipe.ingredients.new({ord: index, ingredient: ing})
      end

      @recipe.directions.each do |direction|
        direction.destroy
      end

      direction_params.each_with_index do |step, index|
        next if step.blank?
        @recipe.directions.new({ord: index, step: step})
      end
    end

    if @recipe.update(recipe_params)
      render :show
    else
      @tags = Tag.all
      render json: @recipe.errors.full_messages, status: 422
    end
  end

  def destroy
    recipe = Recipe.find(params[:id])
    recipe.try(:destroy)
    render json: {}
  end

  private
  def recipe_params
    params.require(:recipe).require(:recipe).permit(:title, :description, :servings, :img_url, :cooking_time, tag_ids: [])
  end

  def ingredient_params
    if params.require(:recipe).require(:ingredient)
      params.require(:recipe).require(:ingredient)
    else
      []
    end
  end

  def direction_params
    if params.require(:recipe).require(:direction)
      params.require(:recipe).require(:direction)
    else
      []
    end
  end
end
