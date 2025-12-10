dev:
	docker compose -f compose.dev.yaml --env-file .env.dev up

clean:
	docker system prune -af --volumes

clean-ultra:
	docker system prune -af --volumes
	sudo rm -r database

prod:
	GATEWAY_PORT=8000 docker compose -f compose.prod.yaml --env-file .env.prod up