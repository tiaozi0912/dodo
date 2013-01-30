class User < ActiveRecord::Base
  attr_accessible :email, :event_id, :expense_id, :username
  has_and_belongs_to_many :events
  has_many :expenses, :dependent => :destroy
  has_many :participants

  # str => "All" or "Jim,Mike,Dodo"
  def self.get_user_ids str,e
  	if str == "All"
  		user_ids = e.event.users.map(&:id)
  	else
  		user_ids = Array new
      usernames = str.split(',')
      usernames.each do |n|
      	user_id = e.event.users.where("username = ?",n)[0].id
        user_ids.push user_id
      end
  	end
    puts "user ids are:"
    puts user_ids
    return user_ids
  end

end
