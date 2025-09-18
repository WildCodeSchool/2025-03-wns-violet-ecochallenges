dev:
	docker compose -f compose.dev.yaml --env-file .env.dev up

clean:
	docker system prune -af --volumes

clean-ultra:
	docker system prune -af --volumes
	sudo rm -rf /database
