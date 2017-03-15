echo 'Populating test data'
mongoimport --db zotplan_test --collection departments --drop --file tests/datasets/departments.json
mongoimport --db zotplan_test --collection courses     --drop --file tests/datasets/courses.json
mongoimport --db zotplan_test --collection users       --drop --file tests/datasets/users.json
mongoimport --db zotplan_test --collection plans       --drop --file tests/datasets/plans.json

echo 'Running test'
ENVIRONMENT=test istanbul cover _mocha -- --reporter spec --compilers js:babel-register --require babel-polyfill --recursive ./tests
