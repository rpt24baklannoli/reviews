curl -X DELETE "http://admin:admin@localhost:5984/items"
curl -X PUT  "http://admin:admin@localhost:5984/items?partitioned=true"

export COUCH_URL="http://admin:admin@localhost:5984"
#export COUCH_DELIMITER=","
export COUCH_PARALLELISM=10
export COUCH_BUFFER_SIZE=1000

#export COUCH_DATABASE="items"
#time cat ./database/items.csv | couchimport
export COUCH_DATABASE="items"
#time cat ./database/reviews.csv | couchimport
time cat ./database/items.json | couchimport --type jsonl

