class AddFavedToLink < ActiveRecord::Migration[5.0]
  def change
    add_column :links, :faved, :boolean
  end
end
