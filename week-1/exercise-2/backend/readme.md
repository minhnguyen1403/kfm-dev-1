## run source backend
docker network create --driver overlay --attachable kfm_network
# run file
docker compose up -d
# những đoạn mount thư muc từ host vào container -> thì nhớ cấp quyền cho thư mục share từ host nếu bị lỗi