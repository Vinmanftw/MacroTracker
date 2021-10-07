class MealsController < ApplicationController
    before_action :meal_params, only: [:create]
    def create
        meal = Meal.create(meal_params)
        if meal.valid?
            session[:meal_id] = meal.id
            render json: meal, status: :created
        else    
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity

        end
            
    end
    
    def display 
        meal = Meal.find_by(id: session[:meal_id])
        if meal
            render json:meal
        else
            render json: {error: "Not authorized"}, status: :unauthorized
        end
    end

    private
    def meal_params
        params.permit(:name,:protein,:carbs,:fat,:calories)
    end
end
