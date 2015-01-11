Rails.application.routes.draw do
  root to: "static_pages#root"

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
  resources :recipes do
    resources :comments, only: [:create]
  end
  resources :comments, only: [:destroy]

  namespace :api, defaults: { format: :json } do
    resources :recipes
    resources :comments, only: [:create, :destroy, :show]
    resources :favorites, only: [:create, :destroy]
    resources :tags, only: [:show, :index]
    resources :directions, only: [:create, :update, :destroy, :show]
    resources :ingredients, only: [:create, :update, :destroy, :show]
  end
end
