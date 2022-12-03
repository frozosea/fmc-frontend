del-network:
	docker network rm public
network:
	docker network create -d overlay --attachable public
frontend:
	docker stack deploy -c deploy.yaml fmc-frontend
dashboard:
	curl -L https://downloads.portainer.io/ce2-14/portainer-agent-stack.yml -o portainer-agent-stack.yml && docker stack deploy -c portainer-agent-stack.yml portainer
deploy: network dashboard frontend
