class ApplicationController < ActionController::Base
  protect_from_forgery
  include EventsHelper
  include ApplicationHelper

  def participants_to_s e
  	e.participants_to_s
  end
end

