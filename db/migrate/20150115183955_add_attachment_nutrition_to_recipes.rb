class AddAttachmentNutritionToRecipes < ActiveRecord::Migration
  def self.up
    change_table :recipes do |t|
      t.attachment :nutrition
    end
  end

  def self.down
    remove_attachment :recipes, :nutrition
  end
end
