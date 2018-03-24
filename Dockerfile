# Set base images
FROM basenginx:v1.0.0
# Create app directory
# COPY dist/ /usr/share/nginx/html/
ADD dist/admin-production.tgz /usr/share/nginx/admin/
ADD dist/blog-production.tgz /usr/share/nginx/html/