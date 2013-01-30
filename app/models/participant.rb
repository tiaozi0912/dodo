class Participant < ActiveRecord::Base
  attr_accessible :user_id,:expense_id,:flag
  belongs_to :user
  belongs_to :expense
   
  def self.build_with_user_ids user_ids,exp
    all_ids = exp.event.users.map(&:id)
    all_ids.each{|i| Participant.create(:user_id => i,:expense_id => exp.id, :flag => user_ids.include?(i))}
  end

  def self.update_with_user_ids user_ids,exp
    stored_ids = exp.participants.where('flag = true')
    u = find_need_update_ids stored_ids,user_ids
    u[:false].each{|i| set_flag false,i,exp}
    u[:true].each{|i| set_flag true,i,exp}
  end
  
  private
  # return a hash
  def self.find_need_update_ids stored_ids,user_ids
    need_set_false_ids = find_diff stored_ids,user_ids
    new_ids = find_diff user_ids,stored_ids
    Hash[:false => need_set_false_ids, :true => new_ids] 
  end

  # return elements in arr but not in ref
  def self.find_diff ref,arr
    t = Hash.new
    o = Array.new
    ref.each{|i| t[i] = 0}
    arr.each do |el|
      o.push(el) if !t.has_key?(el)
    end
    return o
  end

  def self.set_flag f,user_id,exp
    p = exp.find_participant_by_user_id user_id
    p.update_attributes(:flag => f) if !p.nil?
  end

end