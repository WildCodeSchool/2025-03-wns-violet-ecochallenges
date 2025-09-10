dev:
	docker compose up -d --build

clean:
	docker system prune -af --volumes

clean-ultra:
	docker system prune -af --volumes
	sudo rm -rf /database
