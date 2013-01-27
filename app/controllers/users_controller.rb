class UsersController < ApplicationController
	def create
    event = Event.find(params[:event_id])
		user_names = params[:user_names]
		user_names.each{|username| event.users.create(:username => username)}
    render :json => {:usernames => event.users.map(&:username)}
	end
end

