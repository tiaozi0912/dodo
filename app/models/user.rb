class User < ActiveRecord::Base
  attr_accessible :email, :event_id, :expense_id, :username
  has_many :events
  has_many :expenses
end
