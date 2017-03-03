echo 'Populating test data'
mongoimport --db zotplan_test --collection departments --drop --file test/datasets/departments.json
mongoimport --db zotplan_test --collection courses     --drop --file test/datasets/courses.json
mongoimport --db zotplan_test --collection users       --drop --file test/datasets/users.json
mongoimport --db zotplan_test --collection plans       --drop --file test/datasets/plans.json

echo 'Running test'
ENVIRONMENT=test istanbul cover _mocha -- --reporter spec --compilers js:babel-register --require babel-polyfill --recursive ./test
