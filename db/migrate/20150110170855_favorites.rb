class Favorites < ActiveRecord::Migration
  def change
    create_table :favorites do |t|
      t.integer :user_id, null: false
      t.integer :recipe_id, null: false
    end
    add_index :favorites, :user_id
    add_index :favorites, :recipe_id
    add_index :favorites, [:user_id, :recipe_id]
  end
end
