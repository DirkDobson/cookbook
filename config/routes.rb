Rails.application.routes.draw do
  namespace :api do
    resources :ingredients
    resources :recipes
    resources :recipe_ingredients, only: [:create, :destroy, :new]
  end

  #Do not place any routes below this one
  if Rails.env.production?
    get '*other', to: 'static#index'
  end
end
