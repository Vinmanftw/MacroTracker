class Meal < ApplicationRecord
    validates :name, presence: true
    validates :protein, numericality: true
    validates :carbs, numericality: true
    validates :fat, numericality: true
    validates :calories, numericality: true
    has_many :user_meals
    has_many :users, through: :user_meals

end
