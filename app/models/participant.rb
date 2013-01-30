class Participant < ActiveRecord::Base
  attr_accessible :user_id,:expense_id,:flag
  belongs_to :user
  belongs_to :expense
   
  def self.build_with_user_ids user_ids,exp
    all_ids = exp.event.users.map(&:id)
    all_ids.each{|i| Participant.create(:user_id => i,:expense_id => exp.id, :flag => user_ids.include?(i))}
  end

  def self.update_with_user_ids user_ids,exp
    stored_ids = exp.real_participants_ids
    u = find_need_update_ids stored_ids,user_ids
    u[:false].each{|i| set_flag false,i,exp}
    u[:true].each{|i| set_flag true,i,exp}
  end
  
  private
  # return a hash
  def self.find_need_update_ids stored_ids,user_ids
    need_set_false_ids =  stored_ids - user_ids
    new_ids = user_ids - stored_ids
    Hash[:false => need_set_false_ids, :true => new_ids] 
  end

  def self.set_flag f,user_id,exp
    p = exp.find_participant_by_user_id user_id
    p.update_attributes(:flag => f) if !p.nil?
  end

end