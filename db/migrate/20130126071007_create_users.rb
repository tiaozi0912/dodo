class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.integer :event_id
      t.integer :expense_id

      t.timestamps
    end
  end
end
