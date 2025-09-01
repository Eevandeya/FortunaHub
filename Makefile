.PHONY: lint fix fmt pretty

lint:
	pre-commit run -a

fix:
	ruff check . --fix --exclude "**/migrations/*"

fmt:
	ruff format . --exclude "**/migrations/*"

pretty: fix fmt
