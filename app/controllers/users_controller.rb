class UsersController < ApplicationController
    before_action :user_params, only: :create
    before_action :update_macro_params, only: :update
    before_action :find_user, only: [:show]

    def create
        user = User.create(user_params)
        if user.valid? 
          session[:user_id] = user.id
          render json: user, status: :created

        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end
    # def meals
    #     user = User.find_by(id: params[:user_id])
        
        
    #     if user
    #         render json: user
    #     else
    #         render json: { error: "Not authorized" }, status: :unauthorized
    #     end
    # end
    def show 
        user =User.find_by(id: session[:user_id])
        if user
            render json: user
        else
            render json: { error: "Not authorized" }, status: :unauthorized
        end
    end

    def update 
        user =User.find_by(id: session[:user_id])
        
        if user.update(update_macro_params)
        
            render json: user
            
        else
            render json: {error: user.errors.full_messages}
        end

        
    end

    private
    def update_macro_params
        # weight: params[:user][:weight],height: params[:user][:height],body_fat: params[:user][:body_fat],is_bulking: params[:user][:is_bulking],goal_protein: params[:user][:goal_protein],goal_carbs: params[:user][:goal_carbs],goal_fat: params[:user][:goal_fat],goal_calories: params[:user][:goal_calories],goal_weight: params[:user][:goal_weight],goal_body_fat: params[:user][:goal_body_fat],goal_lb_change_per_week: params[:user][:goal_lb_change_per_week]
        params.require(:user).permit(:weight,:height,:body_fat,:bmr,:tdee,:is_bulking,:activity,:goal_protein,:goal_carbs,:goal_fat,:goal_calories,:goal_weight,:goal_body_fat,:goal_lb_change_per_week)
    end

    def find_user
        user =User.find_by(id: session[:user_id])    
    end

    def user_params
        params.permit(:first_name,:last_name,:is_male,:age,:username, :password, :password_confirmation)
    end
    
end