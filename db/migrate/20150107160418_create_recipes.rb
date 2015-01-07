class CreateRecipes < ActiveRecord::Migration
  def change
    create_table :recipes do |t|
      t.string :title
      t.text :description
      t.integer :user_id
      t.integer :servings
      t.integer :cooking_time
      t.string :img_url

      t.timestamps
    end

    add_index :recipes, :user_id
  end
end
