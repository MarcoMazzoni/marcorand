#!/bin/bash
set -e

SHA=$(git rev-parse --short HEAD)
URL="marcomazzoni/marcorand-frontend"
CURRENT_BUILD=${URL}:${SHA}

docker build --no-cache -t ${CURRENT_BUILD} .
docker tag ${CURRENT_BUILD} ${URL}:latest
docker push ${CURRENT_BUILD}
docker push ${URL}:latest

echo "-------------------------------------------"
echo "Deployed:    ${CURRENT_BUILD}"
