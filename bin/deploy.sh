#!/usr/bin/env bash

function _info() {
  echo ""
  echo " ===> $1"
  echo ""
}

function _fail() {
  if [ ! -z "$1" ]; then
    echo "$1"
  fi
  exit 1
}

_info "Validating environment"
if [ -z "$DEPLOY_SERVER_DSN" ] || [ -z "$DEPLOY_SERVER_ROOT" ]; then
  _fail "Missing deploy server configuration"
elif [ -z "$(which rsync)" ]; then
  _fail "Missing rsync utility"
fi

_info "Building dc-spa image"
docker build -t dc-spa . || _fail

_info "Exporting image into dc-spa.tar archive"
docker save dc-spa > dc-spa.tar || _fail

_info "Sending image and configuration to $DEPLOY_SERVER_DSN"
rsync -av dc-spa.tar docker-compose.yml "$DEPLOY_SERVER_DSN:$DEPLOY_SERVER_ROOT/" || _fail

_info "Deploying image on remote server"
_CMD="$(cat <<-EOF
cd '$DEPLOY_SERVER_ROOT'
docker load --input dc-spa.tar
docker-compose up -d
rm -rf dc-spa.tar docker-compose.yml
docker ps
EOF
)"
ssh "$DEPLOY_SERVER_DSN" "$_CMD" || _fail
