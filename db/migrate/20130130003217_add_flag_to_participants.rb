class AddFlagToParticipants < ActiveRecord::Migration
  def up
  	add_column :participants,:flag,:boolean, :default => false
  end
  def down
  	remove_column :participants,:flag
  end
end
