class Post < ActiveRecord::Base
  attr_accessible :title, :body, :emotion, :photo

  has_attached_file :photo,
                      :styles => { :thumbnail => "50x50#",
                                     :small => "100x100#",
                                     :medium => "200x200#",
                                     :large => "400x400#" },
                      :storage => :s3,
                      :s3_credentials => S3_CREDENTIALS,
                      :url=>"/created_at_:created_at/:style.jpg",
                      :path => '/app/public/:url'

  Paperclip.interpolates :created_at do |attachment, style|
    attachment.instance.created_at
  end

  def self.emotions
  	[
  		"sad",
  		"very sad",
  		"happy",
  		"very happy",
  		"nothing"
  	]
  end

  def has_photo?
    !photo.url.include?('missing')
  end

  def info
    {
      :body => body,
      :title => title,
      :thumbnail => photo.url(:medium),
      :created_at => created_at,
      :date => date
    }
  end

end
