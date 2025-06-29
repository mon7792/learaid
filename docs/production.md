1. create a production github client.
2. create a stripe credentials
3. create redis
4. create postgres
5. better auth secret. 
6. remove unused code.

6. Change to gemmi open api key



1. spin up the database.
2. migrate the data.


docker buildx build \
--build-arg NODE_ENV=production \
--push --platform linux/arm64/v8,linux/amd64 \
--tag ghcr.io/mon7792/croi.ai.app:latest .