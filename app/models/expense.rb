class Expense < ActiveRecord::Base
  attr_accessible :description, :event_id, :name, :user_id,:cost,:user_id

  belongs_to :user
  belongs_to :event
  has_many :participants, :dependent => :destroy
 
  default_scope :order => 'expenses.created_at ASC'

  def find_participant_by_user_id user_id
    participants.where('user_id = ?',user_id)[0]
  end
  
  # return string "Yujun Wu,Dodo"
  def participants_to_s 
    names_arr = Array.new
    real_participants.each {|p| names_arr.push p.user.username}
    return ((event.users.map(&:username) - names_arr).empty? ? "All" : names_arr.join(','))
  end

  def real_participants
    participants.where('flag = true')
  end

  def real_participants_ids
    real_participants.map(&:user_id)
  end
  
  #spent for the people who participate
  def spent_per_person 
    count = real_participants.size
    return (cost / count).round(2)
  end

end
