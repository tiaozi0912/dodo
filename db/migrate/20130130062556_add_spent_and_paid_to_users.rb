class AddSpentAndPaidToUsers < ActiveRecord::Migration
  def up
  	add_column :users,:paid,:float,:default => 0.0
  	add_column :users,:spent,:float,:default => 0.0
  end

  def down
  	remove_column :users,:paid
  	remove_column :users,:spent
  end
end
