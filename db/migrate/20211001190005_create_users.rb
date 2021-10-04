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
      t.boolean :is_bulking
      t.belongs_to :goal
      

      t.timestamps
    end
  end
end
