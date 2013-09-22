class UniqueEventUrl < ActiveRecord::Migration
  def change
  	rename_column :events, :url, :uuid
  	add_index :events, :uuid, :unique => true
  end
end
