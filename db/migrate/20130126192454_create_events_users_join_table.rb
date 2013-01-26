class CreateEventsUsersJoinTable < ActiveRecord::Migration
  def up
  	create_table :events_users, :id => false do |t|
  		t.integer :event_id
  		t.integer :user_id
  	end

  	remove_column :users, :event_id
  	remove_column :events, :user_id
  end

  def down
  	drop_table :events_users
  end
end
