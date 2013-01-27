class Participant < ActiveRecord::Base
  attr_accessible :user_id,:expense_id
  belongs_to :users
  belongs_to :expenses
end