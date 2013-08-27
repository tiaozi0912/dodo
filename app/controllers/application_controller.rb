class ApplicationController < ActionController::Base
  protect_from_forgery
  include EventsHelper

  helper_method :formatted_date

  def participants_to_s e
  	e.participants_to_s
  end

  def formatted_date dt    
  	dt.localtime.strftime('%l:%M %P, %F')  # 9:00 PM 2013-08-10
  end

end

