# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130922172549) do

  create_table "events", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string   "uuid"
  end

  add_index "events", ["uuid"], :name => "index_events_on_uuid", :unique => true

  create_table "events_users", :id => false, :force => true do |t|
    t.integer "event_id"
    t.integer "user_id"
  end

  create_table "expenses", :force => true do |t|
    t.string   "name"
    t.string   "description"
    t.integer  "event_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
    t.integer  "user_id"
    t.float    "cost"
  end

  create_table "participants", :force => true do |t|
    t.integer "expense_id"
    t.integer "user_id"
    t.boolean "flag",       :default => false
  end

  add_index "participants", ["expense_id"], :name => "index_participants_on_expense_id"
  add_index "participants", ["user_id"], :name => "index_participants_on_user_id"

  create_table "posts", :force => true do |t|
    t.text     "body"
    t.string   "title"
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.integer  "photo_file_size"
    t.datetime "photo_updated_at"
    t.string   "emotion"
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
    t.datetime "date"
  end

  create_table "users", :force => true do |t|
    t.string   "username"
    t.string   "email"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

end
