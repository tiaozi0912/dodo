module ApplicationHelper
	def formatted_date dt
  	"#{diff_in_days(dt)} day. #{time_str(dt)}"
  end

  def diff_in_days dt
    ((dt - Post.base_day) / 24 / 3600).ceil # should round up
  end

  def time_str dt # 9 day.9:00 PM
    dt.localtime.strftime('%l:%M %P') 
  end

  def current_user
  	session[:current_user]
  end

  def me?
  	current_user == "Yujun"
  end
end
