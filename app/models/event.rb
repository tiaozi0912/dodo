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
  
  private

	def self.make_salt
	  secure_hash("#{Time.now.utc}--#{self.name}")
	end

	def self.secure_hash(string)
	  Digest::SHA2.hexdigest(string)
	end

end
