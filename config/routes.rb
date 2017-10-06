Rails.application.routes.draw do
  mount_ember_app :frontend, to: '/'

  resources :links, only: %i(index create update)
end
