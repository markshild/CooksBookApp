class ApplicationController < ActionController::Base

  protect_from_forgery with: :exception

  helper_method :current_user, :signed_in?

  private
  def current_user
    @current_user ||= session[:session_token] ? User.find(Sessions.find_by_session_token(session[:session_token]).user_id) : nil
  end

  def signed_in?
    !!current_user
  end

  def sign_in(user)
    @current_user = user
    new_token = SecureRandom.urlsafe_base64(16)
    session[:session_token] = new_token
    Sessions.create(user_id: user.id, session_token: new_token)
  end

  def sign_out
    sess = Sessions.find_by_session_token(session[:session_token])
    sess.destroy
    session[:session_token] = nil
  end

  def require_signed_in!
    redirect_to new_session_url unless signed_in?
  end
end
