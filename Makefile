.PHONY: deploy undeploy

APP_NAME:=brewcraft-frontend
INDEX_URL=https://staging-static.brewcraft.io/

# Binaries Path
HELM=helm

deploy:
	# (cd deployment && wget -O index.html "${INDEX_URL}")
	(cd deployment && ${HELM} dependency update)
	(cd deployment && ${HELM} upgrade --install -f values.yaml -f ${VALUES_FILE} -n ${NAMESPACE} ${APP_NAME} .)

undeploy:
	(cd deployment && ${HELM} uninstall -n ${NAMESPACE} ${APP_NAME})
