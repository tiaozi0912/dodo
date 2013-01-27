class Event < ActiveRecord::Base
  attr_accessible :name, :url

  has_and_belongs_to_many :users
  has_many :expenses, :dependent => :destroy

  def self.token
    token = make_salt
    count = 15
    token[0..count]
  end

  # get the array containing the names of the people in the group
  def group
    users.empty? ? [] : users.map(&:username)
  end

  # e.x. params = {"name"=>"Hot Pot", "cost"=>"100.94", "user"=>"Yujun Wu", "participant"=>"All"}
  def get_expense_attr params
      exp_attr = Hash[:name => params['name'],:cost => params['cost'].to_f]
      # username is not unique but username in the same event is unique
      p_user = users.where("username = ?",params['user'])[0]
      puts p_user
      exp_attr[:user_id] = p_user.id
      return exp_attr
  end

  def build_expense params
    exp_attr = get_expense_attr params
    exp = expenses.create(exp_attr)
    exp.build_participant params['participant']
  end

  def update_expense params
  end
  
  private

	def self.make_salt
	  secure_hash("#{Time.now.utc}--#{self.name}")
	end

	def self.secure_hash(string)
	  Digest::SHA2.hexdigest(string)
	end



end
