del-network:
	docker network rm public
network:
	docker network create -d overlay --attachable public
dashboard:
	curl -L https://downloads.portainer.io/ce2-14/portainer-agent-stack.yml -o portainer-agent-stack.yml && docker stack deploy -c portainer-agent-stack.yml portainer
frontend:
	docker stack deploy -c deploy/deploy.yaml frontend
deploy: network dashboard frontend
