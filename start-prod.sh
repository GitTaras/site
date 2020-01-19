#!/usr/bin/env bash

##################################
## Run application in PROD mode ##
##################################


started_at=$(date +"%s")

echo "-----> Provisioning containers"
docker-compose -f docker-compose-prod.yaml up -d
echo ""

web=$(docker-compose -f docker-compose-prod.yaml ps | grep server-prod | awk '{print $1}')

# Run Sequalize's migrations.
echo "-----> Running application migrations"
docker exec -it "$web" sequelize db:migrate
echo ""

# Run Sequalize's seeds.
echo "-----> Running application seeds"
docker exec -it "$web" sequelize db:seed:all
echo "<----- Seeds created"

ended_at=$(date +"%s")

minutes=$(((ended_at - started_at) / 60))
seconds=$(((ended_at - started_at) % 60))

echo "-----> Done in ${minutes}m${seconds}s"
