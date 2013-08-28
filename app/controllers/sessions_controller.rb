class SessionsController < ApplicationController
  def create
    session[:current_user] = User.auth params[:session][:password]
    if session[:current_user].nil?
      flash[:"alert-error"] = "Sorry, wrong password"
      redirect_to root_path
    else
      redirect_to root_path
    end
  end
end

