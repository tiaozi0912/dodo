class CreateExpenses < ActiveRecord::Migration
  def change
    create_table :expenses do |t|
      t.string :name
      t.string :description
      t.integer :user_id
      t.integer :event_id

      t.timestamps
    end
  end
end
