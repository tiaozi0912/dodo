class CreateParticipantModel < ActiveRecord::Migration
  def up
  	create_table :participants do |t|
  		t.integer :expense_id
  		t.integer :user_id
  	end
  	add_index :participants,:expense_id
  	add_index :participants,:user_id
  end

  def down
  	drop_table :participants
  end
end
