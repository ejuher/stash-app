class Link < ApplicationRecord
  validates :url, presence: true

  before_save { scrape_title if title.nil? }
  before_create :normalize_url

  private

  def metainspector
    @metainspector ||= MetaInspector.new(url, download_images: false)
  end

  def scrape_title
    self.title = metainspector.best_title
  end

  def normalize_url
    self.url = metainspector.url
  end
end
