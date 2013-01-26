class Expense < ActiveRecord::Base
  attr_accessible :description, :event_id, :name, :user_id

  has_many :users
  belongs_to :event
 
  # default_scope :order => 'expenses.created_at DESC'
end
