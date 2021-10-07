class Meal < ApplicationRecord
    validates :dotw, presence: true
    validates :user_id, presence: true
    
    # validates :name, presence: true
    # validates :protein, numericality: true
    # validates :carbs, numericality: true
    # validates :fat, numericality: true
    # validates :calories, numericality: true
    belongs_to :user
    
end
