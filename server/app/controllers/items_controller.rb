# frozen_string_literal: true
require 'json'
require 'uri'

class ItemsController < ApplicationController
  include ReactOnRails::Controller

  before_action :setup_store
  layout "items"

  @@items = begin
    file = File.read('../photos.json')
    JSON.parse(file, :symbolize_names => true)
  end

  @@store_props = {
    items: {
      entities: @@items.to_h{ |item| [item[:id], item] },
      ids: @@items.map{ |item| item[:id] },
    }
  }

  def setup_store
    redux_store('main', props: @@store_props)
  end
end
