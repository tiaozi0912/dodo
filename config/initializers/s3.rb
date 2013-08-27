S3_PRO_BUCKET="dodo-production"
S3_DEV_BUCKET="dodo-dev"

S3_KEY="AKIAJI5MZU6KL6UUYPSQ"
S3_SECRET="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"
	
if Rails.env.production?
	bucket = S3_PRO_BUCKET
else
	bucket = S3_DEV_BUCKET
end

S3_CREDENTIALS = {
  :access_key_id => S3_KEY,
  :secret_access_key => S3_SECRET,
  :bucket => bucket
}