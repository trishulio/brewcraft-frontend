.PHONY: deploy undeploy

APP_NAME:=brewcraft-frontend
INDEX_URL=https://staging-static.brewcraft.io/
VALUES_FILE:=values-development.yaml
NAMESPACE:=local

deploy:
	(cd deployment && wget -O index.html "${INDEX_URL}")
	docker-compose -f docker-compose-helm.yml run --rm -T helm upgrade --install -f values.yaml -f ${VALUES_FILE} -n ${NAMESPACE} ${APP_NAME} .

undeploy:
	docker-compose -f docker-compose-helm.yml run --rm -T helm uninstall -n ${NAMESPACE} ${APP_NAME}
