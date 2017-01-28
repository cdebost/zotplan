echo 'Generating test database'
sudo -u postgres psql -d zotplan_test -c 'DROP SCHEMA public CASCADE; CREATE SCHEMA public;' > /dev/null 2> /dev/null
sudo -u postgres psql -d zotplan_test -f 'db/schema/schema.sql' > /dev/null

echo 'Populating test data'
sudo -u postgres psql -d zotplan_test -f 'db/fixtures/fixture.sql' > /dev/null

echo 'Running test'
ENVIRONMENT=test istanbul cover _mocha -- --reporter spec --compilers js:babel-register --require babel-polyfill --recursive ./test

