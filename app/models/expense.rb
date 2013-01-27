class Expense < ActiveRecord::Base
  attr_accessible :description, :event_id, :name, :user_id,:cost,:user_id

  belongs_to :user
  belongs_to :event
  has_many :participants
 
  # default_scope :order => 'expenses.created_at DESC'
  
  # params = 'All' or 'Yujun Wu,Dodo'
  def build_participant params
  	if params == 'All'
  		user_ids = event.users.map(&:id)
  		user_ids.each{|user_id| Participant.create(:user_id => user_id,:expense_id => id)}
  	else
        usernames = params.split(',')
        usernames.each do |username|
        	# username is not unique but username in the same event is unique
          p_user = event.users.where("username = ?",username)[0]
          Participant.create(:user_id => p_user.id,:expense => id)
        end
  	end
  end


end
