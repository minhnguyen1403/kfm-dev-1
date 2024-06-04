## Tạo network trước
`docker network create --driver overlay --attachable kfm_network`


## Chạy Backend trước
`cd backend/`

`docker compose up -d`
#### những đoạn mount thư muc từ host vào container -> thì nhớ cấp quyền cho thư mục share từ host nếu bị lỗi
tạo db mariadb để backend connect
host:localhost
port:3306
user: root
pass: pwd
Tạo Database: KDB
Tạo table: 
```
CREATE TABLE KDB.kf_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL
);
```
#### Khởi động lại backend để kết nối lại db nếu chạy lần đầu, sau khi tạo db các kiểu
`docker-compose restart`


## Chạy source Frontend
`cd frontend/`

`docker-compose up -d`



## Chạy nginx
`cd nginx`

`docker compose up -d`


## Link chạy
##### FE
[localhost](http://localhost)

##### BE
`localhost:3005/v1/users` GET


### week 2


CREATE TABLE KDB.kf_lead_boarders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    late_minute INT NOT NULL,
    late_count INT NOT NULL
);

/v1/users/report-late POST
/v1/users/lead-boarder GET
name, late_minute