class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :user_id
      t.integer :recipe_id
      t.text :body

      t.timestamps
    end

    add_index :comments, :user_id
    add_index :comments, :recipe_id
  end
end
