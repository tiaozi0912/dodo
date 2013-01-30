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
    redirect_to "/events/#{@event.id}/#{token}"
  end

  def update
    expenses = params[:event][:expense]
    event = Event.find(params[:id])
    if !expenses.empty?
      expenses.each do |k,v|
        k.to_i <= 0 ? event.build_expense(k,v) : event.update_expense(k,v)
      end
    end
    redirect_to "/events/#{event.id}/#{event.url}"
  end
end
