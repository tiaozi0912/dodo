class EventsController < ApplicationController
	def home
    @event = Event.new
    render 'home'
	end

  def show
    @event = Event.find(params[:event_id])
    @group = @event.group
    @expenses = @event.expenses
  end

  def create
    token = Event.token
    params[:event][:url] = token
    @event = Event.create(params[:event])
    redirect_to "/events/#{@event.id.to_s}/#{token}"
  end

  def update
  end
end
