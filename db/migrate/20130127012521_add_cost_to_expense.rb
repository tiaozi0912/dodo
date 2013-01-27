class AddCostToExpense < ActiveRecord::Migration
  def up
  	add_column :expenses, :cost,:float
  end
  def down
  	remove_column :expenses, :cost
  end
end
