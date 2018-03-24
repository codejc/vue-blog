# Set base images
FROM basenginx:v1.0.0
# 删除目录底下的文件，将压缩包解压到目标目录
RUN rm -rf /usr/share/nginx/admin/*
RUN rm -rf /usr/share/nginx/html/*
ADD dist/admin-production.tgz /usr/share/nginx/admin/
ADD dist/blog-production.tgz /usr/share/nginx/html/