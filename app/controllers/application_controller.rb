class ApplicationController < ActionController::Base
  protect_from_forgery
  include EventsHelper

  helper_method :formatted_date
  helper_method :current_user, :me?

  def participants_to_s e
  	e.participants_to_s
  end

  def formatted_date dt    
  	diff = ((dt - Post.base_day) / 24 / 3600).ceil # should round up
  	"#{diff} day. #{dt.localtime.strftime('%l:%M %P')}"  # 9 day.9:00 PM
  end

  def current_user
  	session[:current_user]
  end

  def me?
  	current_user == "Yujun"
  end
end

