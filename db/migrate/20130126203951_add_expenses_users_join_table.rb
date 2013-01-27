class AddExpensesUsersJoinTable < ActiveRecord::Migration
  def up
  	create_table :expenses_users, :id => false do |t|
  		t.integer :expense_id
  		t.integer :user_id
  	end

  	remove_column :users, :expense_id
  	remove_column :expenses, :user_id
  end

  def down
  	drop_table :expenses_users
  end
end
