Rails.application.routes.draw do
  root to: "sessions#new"

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
  resources :recipes do
    resources :comments, only: [:create]
  end
  resources :comments, only: [:destroy]
end
