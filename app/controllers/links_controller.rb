class LinksController < ApplicationController
  def index
    render json: Link.where(archived: false)
  end

  def create
    @link = Link.new(link_params)
    if @link.save
      render json: @link
    else
      render json: { errors: @link.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @link = Link.find(params[:id])
    @link.update!(link_params)
    render json: @link
  end

  def new_links_count
    last_link = Link.find(params[:id])
    render json: { new_links_count: Link.where('created_at > ?', last_link.created_at).count }
  end

  private

  def link_params
    ActiveModelSerializers::Deserialization.jsonapi_parse(params, only: %i(url title tag archived))
  end
end
