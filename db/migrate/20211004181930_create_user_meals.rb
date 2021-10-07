class CreateUserMeals < ActiveRecord::Migration[6.1]
  def change
    create_table :user_meals do |t|
      t.belongs_to :meal, null: false, foreign_key: true
      t.belongs_to :user, null: false, foreign_key: true
      
      t.timestamps
    end
  end
end
