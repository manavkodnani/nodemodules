dropdb -U manavkodnani testdb
createdb -U manavkodnani testdb
pg_dump -U manavkodnani manavkodnani -f ./public/test/exercise.sql
psql -U manavkodnani -d testdb -f ./public/test/exercise.sql