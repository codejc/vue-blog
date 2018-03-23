# Set base images
FROM nginx
# Create app directory
COPY dist/ /usr/share/nginx/html/
