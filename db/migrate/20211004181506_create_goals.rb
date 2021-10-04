class CreateGoals < ActiveRecord::Migration[6.1]
  def change
    create_table :goals do |t|
      t.integer :protein
      t.integer :carbs
      t.integer :fat
      t.integer :calories
      t.integer :weight
      t.integer :body_fat
      t.integer :lb_change_per_week
      

      t.timestamps
    end
  end
end
