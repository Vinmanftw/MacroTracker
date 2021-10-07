Rails.application.routes.draw do
  
  post '/signup', to: 'users#create'
  get "/me", to: "users#show"
  get "/users/:id", to: "users#meals"

  patch"/profile", to: "users#update"
  
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  post "/CreateMeal", to: "meals#create"
  patch "/updateMeal/:id", to: "meals#update"
  get "/meals", to: "meals#display"
  delete "/deleteMeal/:id", to: "meals#destroy"
  
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
