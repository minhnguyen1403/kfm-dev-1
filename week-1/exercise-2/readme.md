## run source nginx truoc
cd nginx
docker compose up -d

## run source backend
docker network create --driver overlay --attachable kfm_network
# run file
docker compose up -d
# những đoạn mount thư muc từ host vào container -> thì nhớ cấp quyền cho thư mục share từ host nếu bị lỗi
tạo db mariadb để backend connect
host:localhost
port:3306
user: root
pass: pwd
Tạo Database: KDB
Tạo table: CREATE TABLE KDB.kf_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL
);

## build lại backend để kết nối tới db

localhost:3005/v1/users GET