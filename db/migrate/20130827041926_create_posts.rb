class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.text :body
      t.string :title
      t.attachment :photo
      t.string :emotion
      t.timestamps
    end
  end
end
