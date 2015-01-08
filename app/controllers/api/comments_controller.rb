class CommentsController < ApplicationController
  def create
    recipe = Recipe.find(params[:recipe_id])
    comment = recipe.comments.new(comment_params)
    comment.user_id = current_user.id

    comment.save
    flash[:errors] = comment.errors.full_messages
    redirect_to recipe_url(recipe)
  end

  def destroy
    comment = Comment.find(params[:id])
    comment.destroy
    redirect_to recipe_url(comment.recipe_id)
  end

  private
  def comment_params
    params.require(:comment).permit(:body)
  end
end
