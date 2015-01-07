class CreateDirections < ActiveRecord::Migration
  def change
    create_table :directions do |t|
      t.integer :recipe_id, null: false
      t.string :step, null: false
      t.integer :ord

      t.timestamps
    end
    add_index :directions, :recipe_id
    add_index :directions, :ord
  end
end
