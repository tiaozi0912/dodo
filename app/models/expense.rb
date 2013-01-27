class Expense < ActiveRecord::Base
  attr_accessible :description, :event_id, :name, :user_id

  belongs_to :users
  belongs_to :event
  has_many :participants
 
  # default_scope :order => 'expenses.created_at DESC'
end
