class Api::TagsController < ApplicationController
  def index
    @tags = Tag.all
    render :index
  end

  def top
    @tags = Tag.joins(:join_tags).group('tags.id').order('COUNT (join_tags.tag_id) DESC').limit(3)
    render :top
  end

  def show
    @tag = Tag.find(params[:id])
    @recipes = @tag.recipes
  end
end
