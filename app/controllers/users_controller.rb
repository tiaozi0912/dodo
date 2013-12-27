class UsersController < ApplicationController
	def create
    event = Event.find(params[:event_id])
    event.users.create(:username => params[:username])
    render :json => {:username => params[:username]}
	end

	def delete
		@user = nil
		@event = Event.find_by_id(params[:event_id])
		@event.users.each {|u| @user = u if u.username == params[:username]}
    if @user
    	@event.users.delete(@user)
    	render :json => {:message => "deleted!"}
    else
    	render :json => {:message => "can't find the user"}
    end
	end
end

