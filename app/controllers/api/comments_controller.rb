class Api::CommentsController < ApplicationController
  def create
    recipe = Recipe.find(params[:comment][:recipe_id])
    @comment = recipe.comments.new(comment_params)
    @comment.user_id = current_user.id
    if @comment.save
      render :show
    else
      render json: @comment.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    comment = Comment.find(params[:id])
    comment.destroy
    render json: {}
  end

  private
  def comment_params
    params.require(:comment).permit(:body)
  end
end
