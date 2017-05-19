class ChangeArchivedDefaultToFalse < ActiveRecord::Migration[5.0]
  def change
    change_column :links, :archived, :boolean, default: false
  end
end
