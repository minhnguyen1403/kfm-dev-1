#!/bin/sh

# Biến để theo dõi trạng thái kết nối
connected=false

# Kiểm tra xem cơ sở dữ liệu đã sẵn sàng chưa
until $connected; do
  if nc -z -v -w10 kfm_mariadb 3306; then
    connected=true
    echo "Database is ready!"
  else
    echo "Waiting for database connection..."
    # Đợi 1 giây trước khi kiểm tra lại
    sleep 1
  fi
done

# Sau khi kết nối đã sẵn sàng, thực thi lệnh npm run dev
if $connected; then
  npm run dev
fi
