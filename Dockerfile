# Set base images
FROM nginx
# Create app directory
# COPY dist/ /usr/share/nginx/html/
ADD dist/admin-production.tgz /usr/share/nginx/admin/
ADD dist/blog-production.tgz /usr/share/nginx/html/