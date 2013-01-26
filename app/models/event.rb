class Event < ActiveRecord::Base
  attr_accessible :name, :user_id

  has_many :users
  has_many :expenses, :dependent => :destroy 
end
