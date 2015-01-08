class RecipesController < ApplicationController


  def index
    @recipes = Recipe.all
  end

  def show
    @recipe = Recipe.find(params[:id])
  end

  def new
    @recipe = Recipe.new
    3.times do |i|
      @recipe.ingredients.new(ord: i)
      @recipe.directions.new(ord: i)
    end
    @tags = Tag.all
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
      redirect_to recipe_url(@recipe)
    else
      flash.now[:errors] = @recipe.errors.full_messages
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
      ingredient_params.keys.each do |key|
        @ingredient = Ingredient.find(ingredient_params[key]['id'])
        @ingredient.update({ord: ingredient_params[key]['ord'], ingredient: ingredient_params[key]['name']})
      end
      direction_params.keys.each do |key|
        @direction = Direction.find(direction_params[key]['id'])
        @direction.update({ord: direction_params[key]['ord'], step: direction_params[key]['name']})
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
    params.require(:recipe).permit(:title, :description, :servings, :img_url, :cooking_time, tag_ids: [])
  end

  def ingredient_params
    params.require(:ingredient)
  end

  def direction_params
    params.require(:direction)
  end
end
