class Links < ActiveRecord::Migration[5.0]
  def change
    create_table :links do |t|
      t.string :url
      t.string :title
      t.string :author

      t.timestamps
    end
  end
end
