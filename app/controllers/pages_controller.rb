class PagesController < ApplicationController
	def index
		@posts = Post.order("date DESC").all
	end
end
