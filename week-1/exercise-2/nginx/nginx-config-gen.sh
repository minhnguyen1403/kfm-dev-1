
#!/bin/bash

# hàm generate ra nginx config
regenerate_nginx_config() {
    # service khai báo
    services=(
        '{"name":"kf_users","path":"/v1/users"}'
        '{"name":"kf_roles","path":"/v1/roles"}'
    )

    # parse ra value từ string json -> này cú pháp copy
    extract_value() {
        echo $1 | sed -n 's|.*"'$2'":"\([^"]*\)".*|\1|p'
    }

    # Create the Nginx configuration file
    cat <<EOL > /etc/nginx/nginx.conf
events {
    worker_connections 1024;
}

http {
EOL

    echo "Generating Nginx configuration "

    # duyệt qua mỗi service khai báo
    for service in "${services[@]}"; do
        name=$(extract_value $service "name")
        path=$(extract_value $service "path")
        echo "Processing service: $name with path: $path"

        # kiếm những thằng cùng tên
        # ko có thì skip
        container_ids=$(docker ps --filter "name=$name" --format "{{.ID}}")
        if [ -z "$container_ids" ]; then
            echo "Skipping container $name as it has no IP address."
            continue
        fi
        echo "Found containers for $name: $container_ids"

        
        cat <<EOL >> /etc/nginx/nginx.conf
    upstream ${name}_servers {
EOL

        # Add servers to the upstream block
        for container_id in $container_ids; do
            container_name=$(docker inspect -f '{{.Name}}' $container_id | sed 's/^\///')
            # check container run xong thì mới cho vô
            # -> để tránh trường hợp nó chưa run xong mà nginx nó lấy lun
            while true; do
                container_status=$(docker inspect -f '{{.State.Health.Status}}' $container_id 2>/dev/null)
                if [ "$container_status" = "healthy" ] || [ -z "$container_status" ]; then
                    break
                fi
                echo "Waiting for container $container_name to be healthy..."
                sleep 1
            done
            ## ADD PORT ĐÂY
            echo "Adding server $container_name:3000 to upstream ${name}_servers"
            echo "        server $container_name:3000;" >> /etc/nginx/nginx.conf
        done

        cat <<EOL >> /etc/nginx/nginx.conf
    }

    server {
        listen 3005;

        location $path {
            proxy_pass http://${name}_servers;
        }
    }
EOL

    done

    cat <<EOL >> /etc/nginx/nginx.conf
}
EOL

    echo "Nginx configuration generated successfully."

    # nếu nó chưa start thì start
    # rồi thì load config thôi -> để nó khỏi send ... already use in
    if ! ps aux | grep -q "[n]ginx"; then
        echo "Starting Nginx..."
        nginx
    else
        echo "Reloading Nginx..."
        nginx -s reload
    fi
    echo "Nginx started or reloaded successfully."
}

# Listen to Docker events and trigger config regeneration
docker events --filter 'event=start' --filter 'event=stop' --filter 'event=die' |
while read event; do
    echo "Docker event detected: $event"
    regenerate_nginx_config
done
