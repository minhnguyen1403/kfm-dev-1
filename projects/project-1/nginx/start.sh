#!/bin/bash

# Chạy script để tạo cấu hình Nginx
/usr/local/bin/nginx-config-gen.sh

# Khởi động Nginx
nginx -g "daemon off;"
