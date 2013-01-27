class User < ActiveRecord::Base
  attr_accessible :email, :event_id, :expense_id, :username
  has_and_belongs_to_many :events
  has_and_belongs_to_many :expenses

end
