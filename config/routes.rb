Rails.application.routes.draw do
  mount_ember_app :frontend, to: '/'

  resources :links, only: %i(index create update)
  get '/links/new_links_count/:id', to: 'links#new_links_count'
end
