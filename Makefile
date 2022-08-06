.PHONY: deploy undeploy

APP_NAME:=brewcraft-frontend
VALUES_FILE:=values-development.yaml
NAMESPACE:=local

deploy:
	docker-compose -f docker-compose-helm.yml run --rm -T helm upgrade --install -f values.yaml -f ${VALUES_FILE} -n ${NAMESPACE} ${APP_NAME} .

undeploy:
	docker-compose -f docker-compose-helm.yml run --rm -T helm uninstall -n ${NAMESPACE} ${APP_NAME}
