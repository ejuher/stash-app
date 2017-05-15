class AddArchivedToLink < ActiveRecord::Migration[5.0]
  def change
    add_column :links, :archived, :boolean
  end
end
