class ArchivedDefault < ActiveRecord::Migration[5.0]
  def change
    change_column :links, :archived, :boolean, default: true
    Link.update_all(archived: false)
  end
end
