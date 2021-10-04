class CreateMeals < ActiveRecord::Migration[6.1]
  def change
    create_table :meals do |t|
      t.string :name
      t.integer :protein
      t.integer :carbs
      t.integer :fat
      t.integer :calories

      t.timestamps
    end
  end
end
