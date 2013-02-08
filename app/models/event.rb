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
      puts "username is #{params['user']}"
      # username is not unique but username in the same event is unique
      p_user = users.where("username = ?",params['user'])[0]
      exp_attr[:user_id] = p_user.id
      return exp_attr
  end

  def build_expense k,params
    exp_attr = get_expense_attr params
    exp = expenses.create(exp_attr)
    user_ids = User.get_user_ids params['participant'],exp
    Participant.build_with_user_ids user_ids,exp
  end

  def update_expense k,params
    exp = Expense.find(k.to_i)
    if !exp.nil?
      exp_attr = get_expense_attr params
      exp.update_attributes(exp_attr)
      user_ids = User.get_user_ids params['participant'],exp
      Participant.update_with_user_ids user_ids,exp
    end
  end
 
  # here is the algorithm to settle the money among users
  def settle
    # poeple is an arr containing object {:attr => {:id => ,:balance =>},:pay_to => {{user_id =>amount},}}
    people = init_settle
    people.sort_by! {|obj| obj[:attr][:balance]}
    while people.last[:attr][:balance] > 0.009
     do_transaction people
    end
    people = select people
  end
  
  private

	def self.make_salt
	  secure_hash("#{Time.now.utc}--#{self.name}")
	end

	def self.secure_hash(string)
	  Digest::SHA2.hexdigest(string)
	end

  def init_cash_flow
    cf = Hash.new
    users.each {|user| cf[user.id] = Hash[:spent => 0.0, :paid => 0.0]}
    return cf
  end

  def init_settle
    people = Array.new
    users.each do |u|
      people.push({:attr => {:id => u.id,:balance => u.balance(id)},:paid_to => {}})
    end
    return people 
  end
  
  # pick the people with most negative balance and the most positive balance. i.e. ppl.first and ppl.last
  # update the balance with:
  #     ppl.last.balance += ppl.first.balance
  #     ppl.first.balance = 0
  # record the transaction by updating :pay_to
  # sort people again
  def do_transaction ppl
    p1 = ppl.last
    p2 = ppl.first
    record_transaction p2,p1
    p1[:attr][:balance] += p2[:attr][:balance]
    p2[:attr][:balance] = 0
    ppl.sort_by! {|obj| obj[:attr][:balance]}
  end

  def record_transaction payer,receiver
    receiver_id = receiver[:attr][:id]
    amount = -payer[:attr][:balance]
    if payer[:paid_to].has_key? receiver_id
      payer[:paid_to][receiver_id] += amount
    else
      payer[:paid_to][receiver_id] = amount
    end
  end

  #people is an array contains {:attr=>{:id=>27, :balance=>0}, :paid_to=>{28=>8.75}}
  #select people whose :paid_to => {}
  def select people
    selected = Array.new
    people.each {|p| selected.push(p) if !p[:paid_to].empty?}
    return selected
  end

end
