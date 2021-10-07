class MealsController < ApplicationController
    # before_action :meal_params, only: [:create]
    def create
        meal = Meal.create(meal_params)
        if meal
            render json: meal, status: :created
        else    
            render json: { errors: meal.errors.full_messages }, status: :unprocessable_entity

        end
            
    end
    
    def update 
        meal = Meal.find_by(:id => params[:id])
        if meal
            meal.update(meal_update_params)
            render json: meal
        else
            render json: {error: "Not authorized"}, status: :unauthorized
        end
    end

    def destroy
        meal = Meal.find_by(:id => params[:id])
        if meal
            meal.destroy
            head :no_content
        else
            render json: {error: error.full_messages }, status: :unauthorized
        end
    end

    private
    def meal_params
        params.permit(:dotw, :user_id)
    end
    def meal_update_params
        params.permit(:name,:protein,:carbs,:fat,:calories)
    end
end
