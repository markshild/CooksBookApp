class CreateIngredients < ActiveRecord::Migration
  def change
    create_table :ingredients do |t|
      t.integer :recipe_id, null: false
      t.string :ingredient, null: false
      t.integer :ord, default: 1

      t.timestamps
    end

    add_index :ingredients, :recipe_id
    add_index :ingredients, :ord
    add_index :ingredients, :ingredient
  end
end
