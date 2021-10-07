class FoodSerializer < ActiveModel::Serializer
  attributes :id, :total_cal, :total_protein, :total_carbs, :total_fat,:weight,:height,:body_fat,:bmr,:tdee,:is_bulking,:activity,:goal_protein,:goal_carbs,:goal_fat,:goal_calories,:goal_weight,:goal_body_fat,:goal_lb_change_per_week,:first_name,:last_name,:is_male,:age,:username 
  has_many :meals
    def total_cal
      
      current_user.meals.sum(:calories)
      
    end

    def total_protein
      current_user.meals.sum(:protein)
    end
    def total_carbs
      current_user.meals.sum(:carbs)
    end
    def total_fat
      current_user.meals.sum(:fat)
    end
end
