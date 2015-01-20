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
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150120171131) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: true do |t|
    t.integer  "user_id"
    t.integer  "recipe_id"
    t.text     "body"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comments", ["recipe_id"], name: "index_comments_on_recipe_id", using: :btree
  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "directions", force: true do |t|
    t.integer  "recipe_id",  null: false
    t.string   "step",       null: false
    t.integer  "ord"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "directions", ["ord"], name: "index_directions_on_ord", using: :btree
  add_index "directions", ["recipe_id"], name: "index_directions_on_recipe_id", using: :btree

  create_table "favorites", force: true do |t|
    t.integer "user_id",   null: false
    t.integer "recipe_id", null: false
  end

  add_index "favorites", ["recipe_id"], name: "index_favorites_on_recipe_id", using: :btree
  add_index "favorites", ["user_id", "recipe_id"], name: "index_favorites_on_user_id_and_recipe_id", using: :btree
  add_index "favorites", ["user_id"], name: "index_favorites_on_user_id", using: :btree

  create_table "ingredients", force: true do |t|
    t.integer  "recipe_id",              null: false
    t.string   "ingredient",             null: false
    t.integer  "ord",        default: 1
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "ingredients", ["ingredient"], name: "index_ingredients_on_ingredient", using: :btree
  add_index "ingredients", ["ord"], name: "index_ingredients_on_ord", using: :btree
  add_index "ingredients", ["recipe_id"], name: "index_ingredients_on_recipe_id", using: :btree

  create_table "join_tags", force: true do |t|
    t.integer "tag_id",    null: false
    t.integer "recipe_id", null: false
  end

  add_index "join_tags", ["recipe_id"], name: "index_join_tags_on_recipe_id", using: :btree
  add_index "join_tags", ["tag_id"], name: "index_join_tags_on_tag_id", using: :btree

  create_table "recipes", force: true do |t|
    t.string   "title"
    t.text     "description"
    t.integer  "user_id"
    t.integer  "servings"
    t.integer  "cooking_time"
    t.string   "img_url"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "picture_file_name"
    t.string   "picture_content_type"
    t.integer  "picture_file_size"
    t.datetime "picture_updated_at"
    t.string   "nutrition_file_name"
    t.string   "nutrition_content_type"
    t.integer  "nutrition_file_size"
    t.datetime "nutrition_updated_at"
  end

  add_index "recipes", ["user_id"], name: "index_recipes_on_user_id", using: :btree

  create_table "sessions", force: true do |t|
    t.string   "session_token"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "sessions", ["session_token"], name: "index_sessions_on_session_token", unique: true, using: :btree
  add_index "sessions", ["user_id"], name: "index_sessions_on_user_id", using: :btree

  create_table "tags", force: true do |t|
    t.string   "name",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "email"
    t.string   "password_digest"
    t.string   "img_url"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "provider"
    t.string   "uid"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["password_digest"], name: "index_users_on_password_digest", using: :btree
  add_index "users", ["provider", "uid"], name: "index_users_on_provider_and_uid", unique: true, using: :btree

end
