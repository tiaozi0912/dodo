class User < ActiveRecord::Base
  attr_accessible :email, :event_id, :expense_id, :username, :spent,:paid
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
    return user_ids
  end

  def paid event_id
    paid = 0
    expenses.where('event_id = ?',event_id).each {|exp| paid += exp.cost}
    return paid.round(2)
  end

  def spent event_id
    spent = 0
    participants_in_event(event_id).each {|p| spent += p.expense.spent_per_person}
    return spent.round(2)
  end

  def balance event_id
    ( paid(event_id) - spent(event_id) ).round(2)
  end
  
  def participants_in_event event_id
    a = Array.new
    real_participants.each {|p| a.push(p) if p.expense.event_id == event_id}
    return a
  end

  def real_participants
    participants.where('flag = true')
  end
  
  # poeple is an arr containing object {:attr => {:id => ,:balance=> },:paid_to => {{user_id =>amount},}}
  def in? people
    people.each {|obj| flag = (obj[:attr][:id] == id)}
    return flag
  end

  def settle people
    s = nil
    people.each do |obj| 
      s = obj  if obj[:attr][:id] == id
    end
    return s
  end

  def self.auth p
    password[p]
  end

  def self.password
    {
      "I like dodo" => "Yujun",
      "I am dodo" => "Dodo"
    }
  end
end
