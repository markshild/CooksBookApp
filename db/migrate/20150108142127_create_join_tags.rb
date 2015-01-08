class CreateJoinTags < ActiveRecord::Migration
  def change
    create_table :join_tags do |t|
      t.integer :tag_id, null: false
      t.integer :recipe_id, null: false
    end
    add_index :join_tags, :tag_id
    add_index :join_tags, :recipe_id
  end
end
