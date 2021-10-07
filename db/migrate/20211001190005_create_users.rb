class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :first_name
      t.string :last_name
      t.string :is_male
      t.integer :age
      t.integer :weight
      t.integer :height
      t.integer :body_fat
      t.integer :bmr
      t.integer :tdee
      t.string :is_bulking
      t.string :activity
      t.integer :goal_protein
      t.integer :goal_carbs
      t.integer :goal_fat
      t.integer :goal_calories
      t.integer :goal_weight
      t.integer :goal_body_fat
      t.integer :goal_lb_change_per_week
      

      t.timestamps
    end
  end
end
