# #!/bin/bash

# # Array of services with name and path
# services=(
#     '{"name":"kf_users","path":"/v1/users"}'
#     '{"name":"kf_roles","path":"/v1/roles"}'
# )

# # Function to extract values from JSON strings
# extract_value() {
#     echo $1 | sed -n 's|.*"'$2'":"\([^"]*\)".*|\1|p'
# }

# # Create the Nginx configuration file
# cat <<EOL > /etc/nginx/nginx.conf
# events {
#     worker_connections 1024;
# }

# http {
# EOL

# echo "Generating Nginx configuration..."

# # Iterate over each service to add upstream and server blocks
# for service in "${services[@]}"; do
#     name=$(extract_value $service "name")
#     path=$(extract_value $service "path")
#     echo "Processing service: $name with path: $path"

#     # Get the list of container IDs for the current service
#     container_ids=$(docker ps --filter "name=$name" --format "{{.ID}}")
#     if [ -z "$container_ids" ]; then
#         echo "Skipping container $name as it has no IP address."
#         continue
#     fi
#     echo "Found containers for $name: $container_ids"

#     # Add upstream block for the current service
#     cat <<EOL >> /etc/nginx/nginx.conf
#     upstream ${name}_servers {
# EOL

#     # Add servers to the upstream block
#     for container_id in $container_ids; do
#         container_name=$(docker inspect -f '{{.Name}}' $container_id | sed 's/^\///')
#         echo "Adding server $container_name:3000 to upstream ${name}_servers"
#         echo "        server $container_name:3000;" >> /etc/nginx/nginx.conf
#     done

#     cat <<EOL >> /etc/nginx/nginx.conf
#     }

#     server {
#         listen 3005;

#         location $path {
#             proxy_pass http://${name}_servers;
#         }
#     }
# EOL

# done

# cat <<EOL >> /etc/nginx/nginx.conf
# }
# EOL

# echo "Nginx configuration generated successfully."


#!/bin/bash

# Function to regenerate nginx config
regenerate_nginx_config() {
    # Array of services with name and path
    services=(
        '{"name":"kf_users","path":"/v1/users"}'
        '{"name":"kf_roles","path":"/v1/roles"}'
        # Add more services here
    )

    # Function to extract values from JSON strings
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

    echo "Generating Nginx configuration..."

    # Iterate over each service to add upstream and server blocks
    for service in "${services[@]}"; do
        name=$(extract_value $service "name")
        path=$(extract_value $service "path")
        echo "Processing service: $name with path: $path"

        # Get the list of container IDs for the current service
        container_ids=$(docker ps --filter "name=$name" --format "{{.ID}}")
        if [ -z "$container_ids" ]; then
            echo "Skipping container $name as it has no IP address."
            continue
        fi
        echo "Found containers for $name: $container_ids"

        # Add upstream block for the current service
        cat <<EOL >> /etc/nginx/nginx.conf
    upstream ${name}_servers {
EOL

        # Add servers to the upstream block
        for container_id in $container_ids; do
            container_name=$(docker inspect -f '{{.Name}}' $container_id | sed 's/^\///')
            # Wait for the container to be healthy and ready
            while true; do
                container_status=$(docker inspect -f '{{.State.Health.Status}}' $container_id 2>/dev/null)
                if [ "$container_status" = "healthy" ] || [ -z "$container_status" ]; then
                    break
                fi
                echo "Waiting for container $container_name to be healthy..."
                sleep 1
            done
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

    # Start Nginx if it's not already running
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
