class RenameAuthorToTag < ActiveRecord::Migration[5.0]
  def change
    change_table :links do |t|
      t.remove :author
      t.string :tag
    end
  end
end
