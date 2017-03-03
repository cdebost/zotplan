echo 'Populating test data'
mongoimport --db zotplan_test --collection departments --drop --file db/fixtures/departments-dataset.json
mongoimport --db zotplan_test --collection courses     --drop --file db/fixtures/courses-dataset.json
mongoimport --db zotplan_test --collection users       --drop --file db/fixtures/users-dataset.json
mongoimport --db zotplan_test --collection plans       --drop --file db/fixtures/plans-dataset.json

echo 'Running test'
ENVIRONMENT=test istanbul cover _mocha -- --reporter spec --compilers js:babel-register --require babel-polyfill --recursive ./test
